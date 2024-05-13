import type {
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
 * @abstract
 * @class BasicAxiosRequestTransform
 * @description 基础的axios请求转换抽象类，提供了请求与响应阶段的一系列钩子方法供子类实现，以便在请求前后进行自定义处理。
 */
export abstract class BasicAxiosRequestTransform {
  /**
   * @method beforeRequestHook
   * @optional
   * @description 在发起请求前执行的方法，允许对请求配置（config）进行修改。接收 AxiosRequestConfig 和 RequestOptions 参数，返回处理后的 AxiosRequestConfig。
   * @param {AxiosRequestConfig} config - Axios原始请求配置对象
   * @param {RequestOptions} options - 自定义请求选项
   * @returns {AxiosRequestConfig | undefined} 可能修改过的请求配置对象
   */
  beforeRequestHook?(
    config: AxiosRequestConfig,
    options: RequestOptions
  ): AxiosRequestConfig

  /**
   * @method transformRequestHook
   * @optional
   * @description 在收到请求响应后，在响应数据传递给业务逻辑之前执行的方法。接收 AxiosResponse<RequestResult> 和 RequestOptions 参数，返回经过转换的数据。
   * @param {AxiosResponse<RequestResult>} res - Axios响应对象
   * @param {RequestOptions} options - 自定义请求选项
   * @returns {any | undefined} 经过转换的响应数据，也可能返回undefined
   */
  transformRequestHook?(
    res: AxiosResponse<RequestResult>,
    options: RequestOptions
  ): any | undefined

  /**
   * @method requestCatchHook
   * @optional
   * @description 当请求发生错误时执行的方法，接收错误对象（Error）和 RequestOptions 参数，返回一个Promise，通常用于错误处理和重试等操作。
   * @param {Error} e - 抛出的错误对象
   * @param {RequestOptions} options - 自定义请求选项
   * @returns {Promise<any>} 返回一个Promise，通常包含错误处理的结果
   */
  requestCatchHook?(e: Error, options: RequestOptions): Promise<any>

  /**
   * @method requestInterceptors
   * @optional
   * @description 请求拦截器方法，会在请求发出前执行，允许修改请求配置。接收 InternalAxiosRequestConfig 和 CreateAxiosRequestOptions 参数，返回处理后的请求配置对象。
   * @param {InternalAxiosRequestConfig} config - Axios内部请求配置对象
   * @param {CreateAxiosRequestOptions} options - 创建axios实例时的配置选项
   * @returns {InternalAxiosRequestConfig} 可能修改过的请求配置对象
   */
  requestInterceptors?(
    config: InternalAxiosRequestConfig,
    options: CreateAxiosRequestOptions
  ): InternalAxiosRequestConfig

  /**
   * @method responseInterceptors
   * @optional
   * @description 响应拦截器方法，在响应到达且被 axios 处理后执行，允许修改响应数据。接收 AxiosResponse<any> 参数，返回处理后的响应对象。
   * @param {AxiosResponse<any>} res - Axios原始响应对象
   * @returns {AxiosResponse<any>} 可能修改过的响应对象
   */
  responseInterceptors?(res: AxiosResponse<any>): AxiosResponse<any>

  /**
   * @method requestInterceptorsCatch
   * @optional
   * @description 请求拦截器捕获错误的方法，当请求拦截器链中某个拦截器抛出错误时触发。
   * @param {Error} error - 抛出的错误对象
   */
  requestInterceptorsCatch?(error: Error): void

  /**
   * @method responseInterceptorsCatch
   * @optional
   * @description 响应拦截器捕获错误的方法，当响应拦截器链中某个拦截器抛出错误时触发。
   * @param {Error} error - 抛出的错误对象
   */
  responseInterceptorsCatch?(error: Error): void
}
