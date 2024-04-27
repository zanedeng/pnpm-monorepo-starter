import { noop } from '@zkj/utils'
import { AxiosRequestTransform } from './core/AxiosRequestTransform'
import type { ContextOptions } from './interfaces/ContextOptions'

/**
 * @constant {ContextOptions} context
 * @description 定义了一个名为 context 的常量，它是一个 ContextOptions 类型的对象，用于存储和提供一组上下文相关的回调函数和实用方法。这些函数在项目中被用来处理错误、信息提示、授权验证等常见操作。

 * - `getTokenFunction`：默认返回 `undefined`，实际应用中应替换为获取当前用户身份验证 Token 的函数。
 * - `unauthorizedFunction`：默认为noop（空函数），实际应用中应替换为处理未授权或登录失效情况的函数。
 * - `errorFunction`、`msgFunction`、`noticeFunction`、`modalFunction`、`errorModalFunction`：分别用于处理错误、普通消息、通知信息、普通模态框显示和错误模态框显示，目前均默认为noop，应替换为实际的处理函数。
 * - `handleErrorFunction`：默认为noop，实际应用中应替换为统一处理错误并根据不同错误消息模式显示错误信息的函数。
 * - `timeoutFunction`：默认为noop，实际应用中应替换为处理请求超时的函数。
 * - `apiUrl`：初始化为空字符串，用于存储或动态获取 API 请求的基础 URL 地址。
 */
export const context: ContextOptions = {
  getTokenFunction: () => undefined,
  unauthorizedFunction: noop,
  errorFunction: noop,
  msgFunction: noop,
  noticeFunction: noop,
  modalFunction: noop,
  errorModalFunction: noop,
  handleErrorFunction: noop,
  timeoutFunction: noop,
  apiUrl: '',
  transform: new AxiosRequestTransform(),
}

/**
 * @function setMsg
 * @description 将传入的函数赋值给 context 中的 msgFunction 属性，用于替换或设置新的消息提示处理函数。
 * @param {AnyFunction<any>} func - 新的消息提示处理函数，接受任意参数并返回任意类型。
 * 示例：
 * ```typescript
 * setMsg((message: string) => alert(message));
 * ```
 */
export const setMsg = (func: AnyFunction<any>) => {
  context.msgFunction = func
}

/**
 * @function setNotice
 * @description 将传入的函数赋值给 context 中的 noticeFunction 属性，用于替换或设置新的通知处理函数。
 * @param {AnyFunction<any>} func - 新的通知处理函数，接受任意参数并返回任意类型。
 * 示例：
 * ```typescript
 * setNotice((options: NoticeOptions) => notification(options));
 * ```
 */
export const setNotice = (func: AnyFunction<any>) => {
  context.noticeFunction = func
}

/**
 * @function setDialog
 * @description 将传入的函数赋值给 context 中的 modalFunction 属性，用于替换或设置新的模态框显示处理函数。
 * @param {AnyFunction<any>} func - 新的模态框显示处理函数，接受任意参数并返回任意类型。
 * 示例：
 * ```typescript
 * setDialog((dialogProps: DialogProps) => openDialog(dialogProps));
 * ```
 */
export const setDialog = (func: AnyFunction<any>) => {
  context.modalFunction = func
}
