import type { RequestOptions } from './RequestOptions'
import type { BasicAxiosRequestTransform } from '/@/axios/core/BasicAxiosRequestTransform'
import type { AxiosRequestConfig } from 'axios'

/**
 * @interface CreateAxiosRequestOptions
 * @description CreateAxiosRequestOptions 接口扩展了 Axios 的 AxiosRequestConfig 接口，增加了自定义的请求创建选项，用于增强 Axios 请求的功能。
 *
 * @extends AxiosRequestConfig
 * @property {string=} authenticationScheme - 可选的认证方案字符串，用于指定本次请求的认证方式。
 * @property {AxiosRequestTransform=} transform - 可选的 AxiosRequestTransform 类型对象，用于在请求前后执行自定义的转换或处理逻辑。
 * @property {RequestOptions=} requestOptions - 可选的 RequestOptions 类型对象，包含请求相关的附加选项，如是否拼接参数到 URL、是否格式化日期等。
 */
export interface CreateAxiosRequestOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: BasicAxiosRequestTransform
  requestOptions?: RequestOptions
}
