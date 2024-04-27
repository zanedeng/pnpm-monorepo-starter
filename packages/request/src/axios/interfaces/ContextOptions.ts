import type { BasicAxiosRequestTransform } from '../core'

/**
 * @interface ContextOptions
 * @description ContextOptions 接口用于定义一系列上下文相关的方法，这些方法主要服务于错误处理、信息提示、授权验证等功能。

 * @property {AnyFunction<any>} errorFunction - 错误处理函数，接受任意参数，用于处理一般的错误情况。
 * @property {AnyFunction<any>} msgFunction - 消息提示函数，接受任意参数，用于显示一般性的信息提示。
 * @property {AnyFunction<any>} errorModalFunction - 错误模态框显示函数，接受任意参数，用于弹出错误详情的模态框。
 * @property {AnyFunction<any>} noticeFunction - 通知函数，接受任意参数，用于显示通知级别的信息提示。
 * @property {AnyFunction<any>} modalFunction - 模态框显示函数，接受任意参数，用于弹出通用的模态框界面。
 * @property {() => unknown} getTokenFunction - 获取 Token 的函数，无参数，返回未知类型的数据（通常是 Token 字符串或者其他形式的身份验证信息）。
 * @property {(msg?: string) => void} unauthorizedFunction - 未授权处理函数，可选接收一个字符串参数（错误信息），用于处理未授权或登录失效的情况。
 * @property {() => void} timeoutFunction - 超时处理函数，无参数，用于处理请求超时的情况。
 * @property {(message?: string | number, mode?: ErrorMessageMode) => void} handleErrorFunction - 错误处理函数，可选接收一个错误消息字符串和一个错误消息模式参数，用于统一处理各种错误并根据模式显示错误信息。
 * @property {string=} apiUrl - 可选的 API 地址字符串，用于覆盖默认的 API 请求地址。
 */
export interface ContextOptions {
  errorFunction: AnyFunction<any>
  msgFunction: AnyFunction<any>
  errorModalFunction: AnyFunction<any>
  noticeFunction: AnyFunction<any>
  modalFunction: AnyFunction<any>
  getTokenFunction: () => unknown
  unauthorizedFunction: (msg?: string) => void
  timeoutFunction: () => void
  handleErrorFunction: (
    message?: string | number,
    mode?: 'none' | 'modal' | 'message' | undefined
  ) => void
  apiUrl?: string
  transform?: BasicAxiosRequestTransform
}
