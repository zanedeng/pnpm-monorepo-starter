/**
 * @interface RequestResult
 * @template T 代表请求结果的数据类型，默认为 any 类型
 * @description RequestResult 接口用于描述一个 HTTP 请求后的标准响应结果，包含了状态码、响应类型、消息说明及可能存在的业务数据。
 *
 * - `code`（必需，数字类型）：响应的状态码，用于判断请求的执行结果及其类型。
 * - `type`（必需，枚举类型 'success' | 'error' | 'warning'）：响应的类别，指示请求成功、失败或警告等情况。
 * - `message`（必需，字符串类型）：响应的消息描述，通常为人类可读的文本信息。
 * - `result`（可选，类型为 T）：业务数据区域，用于承载请求成功的实际数据内容。如果没有显式提供，则可能是 undefined。
 * - `data`（可选，类型为 T）：另一种表示业务数据的方式，与 `result` 类似，但在某些场景下可能有不同的用途。如果同时存在，两者应具有相同的类型 T，但可能其中一个会被实际使用，另一个则为 undefined。
 */
export interface RequestResult<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result?: T
  data?: T
}
