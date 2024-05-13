import axios from 'axios'
import axiosRetry from 'axios-retry'
import qs from 'qs'
import { cloneDeep, isFunction } from '@zkj/utils'
import { AxiosCanceler } from './AxiosCanceler'
import { ContentTypeEnum, RequestEnum } from '/@/axios/enums'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import type {
  CreateAxiosRequestOptions,
  RequestOptions,
  RequestResult,
} from '/@/axios/interfaces'

/**
 * @class AxiosRequest
 * @classdesc 构造一个封装了axios功能并提供拦截器设置、自定义请求和响应转换等功能的请求类。
 */
export class AxiosRequest {
  /**
   * @private
   * @type {AxiosInstance}
   * @description 存储axios实例
   */
  private axiosInstance: AxiosInstance

  /**
   * @private
   * @type {CreateAxiosRequestOptions}
   * @description 存储创建axios实例所需的配置选项
   */
  private options: CreateAxiosRequestOptions

  /**
   * @constructor
   * @param {CreateAxiosRequestOptions} options - 初始化axios实例所需的各种配置项
   * @description 创建AxiosRequest实例并初始化axios实例以及相关拦截器
   */
  constructor(options: CreateAxiosRequestOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    axiosRetry(this.axiosInstance)
    this.setupInterceptors()
  }

  /**
   * @private
   * @param {CreateAxiosRequestOptions} config - 新的axios配置
   * @description 根据新的配置创建一个新的axios实例
   */
  private createAxios(config: CreateAxiosRequestOptions): void {
    this.axiosInstance = axios.create(config)
    axiosRetry(this.axiosInstance)
  }

  /**
   * @private
   * @returns {any | undefined} 获取options中的transform属性
   */
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  /**
   * @public
   * @returns {AxiosInstance} 获取当前的axios实例
   * @description 返回当前已配置的axios实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @public
   * @param {CreateAxiosRequestOptions} options - 配置项
   * @description 更新axios实例的配置
   */
  configAxios(options: CreateAxiosRequestOptions) {
    if (!this.axiosInstance) {
      return
    }
    const opt: CreateAxiosRequestOptions = Object.assign(
      {},
      this.options,
      options
    )
    this.createAxios(opt)
    this.options = opt
    this.setupInterceptors()
  }

  /**
   * @public
   * @param {any} headers - 请求头信息
   * @description 设置全局请求头
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @private
   * @description 设置请求和响应拦截器
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    const axiosCanceler = new AxiosCanceler()

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // @ts-ignore
        const { ignoreCancelToken } = config.requestOptions
        const ignoreCancel =
          ignoreCancelToken !== undefined
            ? ignoreCancelToken
            : this.options.requestOptions?.ignoreCancelToken

        !ignoreCancel && axiosCanceler.addPending(config)
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
      undefined
    )

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      )

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      )
  }

  /**
   * @private
   * @param {AxiosRequestConfig} config - Axios请求配置
   * @returns {AxiosRequestConfig} 处理后可用于axios发起请求的配置
   * @description 对于需要转换为FormData格式的请求进行处理
   */
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  /**
   * @public
   * @template T
   * @param {AxiosRequestConfig} config - Axios GET请求配置
   * @param {RequestOptions} [options] - 自定义请求选项
   * @returns {Promise<T>} 发起GET请求并返回Promise结果
   */
  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  /**
   * @public
   * @template T
   * @param {AxiosRequestConfig} config - Axios POST请求配置
   * @param {RequestOptions} [options] - 自定义请求选项
   * @returns {Promise<T>} 发起POST请求并返回Promise结果
   */
  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  /**
   * @public
   * @template T
   * @param {AxiosRequestConfig} config - Axios PUT请求配置
   * @param {RequestOptions} [options] - 自定义请求选项
   * @returns {Promise<T>} 发起PUT请求并返回Promise结果
   */
  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  /**
   * @public
   * @template T
   * @param {AxiosRequestConfig} config - Axios DELETE请求配置
   * @param {RequestOptions} [options] - 自定义请求选项
   * @returns {Promise<T>} 发起DELETE请求并返回Promise结果
   */
  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  /**
   * @public
   * @template T
   * @param {AxiosRequestConfig} config - Axios请求配置
   * @param {RequestOptions} [options] - 自定义请求选项
   * @returns {Promise<T>} 发起自定义方法请求并返回Promise结果
   * @description 根据给定的配置和选项发起axios请求，并执行相关的hook函数
   */
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: CreateAxiosRequestOptions = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {}

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<RequestResult>>(conf)
        .then((res: AxiosResponse<RequestResult>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
}
