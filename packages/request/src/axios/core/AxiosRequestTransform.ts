import { appendUrlParams, isFunction, isString } from '@zkj/utils'
import { BasicAxiosRequestTransform } from './BasicAxiosRequestTransform'
import { RequestEnum, ResultEnum } from '/@/axios/enums'
import { context } from '/@/axios/context'
import { checkStatus, formatRequestDate, joinTimestamp } from '/@/utils'
import type {
  CreateAxiosRequestOptions,
  RequestOptions,
  RequestResult,
} from '/@/axios/interfaces'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

/**
 * @class AxiosRequestTransform
 * @description 该类继承自BasicAxiosRequestTransform，实现了请求和响应的拦截器钩子方法，用于对axios请求进行预处理、数据格式转化以及错误处理。
 */
export class AxiosRequestTransform extends BasicAxiosRequestTransform {
  /**
   * @method beforeRequestHook
   * @description 请求发起前的钩子方法，负责拼接API地址、添加时间戳参数、格式化日期、处理restful风格URL等操作。
   * @param {AxiosRequestConfig} config - Axios的请求配置对象。
   * @param {RequestOptions} options - 自定义请求选项。
   * @returns {AxiosRequestConfig} 返回处理后的请求配置对象。
   */
  beforeRequestHook(
    config: AxiosRequestConfig,
    options: RequestOptions
  ): AxiosRequestConfig {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options
    if (apiUrl) {
      const _apuUrl = isString(apiUrl)
        ? apiUrl
        : isFunction(apiUrl)
        ? apiUrl?.()
        : ''
      config.url = `${_apuUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        )
      } else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = appendUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  }

  /**
   * @method transformRequestHook
   * @description 请求响应后的数据转换钩子方法，负责处理后端返回的数据，根据配置决定是否返回原生响应、是否进行数据格式转换以及错误处理。
   * @param {AxiosResponse<RequestResult>} res - Axios响应对象。
   * @param {RequestOptions} options - 自定义请求选项。
   * @returns {any} 返回处理后的响应数据，或者是原始响应对象，或者是抛出错误。
   */
  transformRequestHook(
    res: AxiosResponse<RequestResult>,
    options: RequestOptions
  ): any {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }

    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('The interface request failed, please try again later!')
    }

    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data

    // 这里逻辑可以根据项目进行修改
    const hasSuccess =
      data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess) {
      return result
    }

    // @ts-ignore
    context.msgFunction.error(message)

    switch (code) {
      case ResultEnum.TIMEOUT:
        context.unauthorizedFunction?.(message)
        break
    }

    throw new Error(message)
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    // let timeoutMsg = ''
    // switch (code) {
    //   case ResultEnum.TIMEOUT:
    //     timeoutMsg = t('sys.api.timeoutMessage')
    //     context.timeoutFunction?.()
    //     break
    //   default:
    //     if (message) {
    //       timeoutMsg = message
    //     }
    // }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    // if (options.errorMessageMode === 'modal') {
    //   context.errorModalFunction({
    //     title: t('sys.api.errorTip'),
    //     content: timeoutMsg,
    //   })
    // } else if (options.errorMessageMode === 'message') {
    //   // @ts-ignore
    //   context.msgFunction.error(timeoutMsg)
    // }

    // throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
  }

  /**
   * @method requestInterceptors
   * @description 请求拦截器方法，用于在请求发送前添加认证信息到请求头中。
   * @param {InternalAxiosRequestConfig} config - Axios内部请求配置对象。
   * @param {CreateAxiosRequestOptions} options - 创建axios实例时的配置选项。
   * @returns {InternalAxiosRequestConfig} 返回处理后的请求配置对象。
   */
  requestInterceptors(
    config: InternalAxiosRequestConfig,
    options: CreateAxiosRequestOptions
  ): InternalAxiosRequestConfig {
    // 请求之前处理config
    const token = context.getTokenFunction?.()
    if (
      token &&
      (config as Record<string, any>)?.requestOptions?.withToken !== false
    ) {
      // jwt token
      ;(config as Record<string, any>).headers.Authorization =
        options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token
    }
    return config
  }

  /**
   * @method responseInterceptors
   * @description 响应拦截器方法，目前仅返回原响应对象，但可根据项目需求扩展进行额外处理。
   * @param {AxiosResponse<any>} res - Axios响应对象。
   * @returns {AxiosResponse<any>} 返回原响应对象。
   */
  responseInterceptors(res: AxiosResponse<any>): AxiosResponse<any> {
    return res
  }

  /**
   * @method responseInterceptorsCatch
   * @description 响应拦截器错误处理方法，针对网络错误、超时错误以及其他错误情况进行相应的错误提示，并调用检查状态码的方法。
   * @param {any} error - Axios错误对象。
   */
  responseInterceptorsCatch(error: any): void {
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage =
          'The interface request timed out, please refresh the page and try again!'
      }
      if (err?.includes('Network Error')) {
        errMessage =
          'Please check if your network connection is normal! The network is abnormal'
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          context.errorModalFunction({
            title: 'Error Tip',
            content: errMessage,
          })
        } else if (errorMessageMode === 'message') {
          context.errorFunction(errMessage)
        }
        // return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)
    // return Promise.reject(error)
  }
}
