/**
 * @interface RequestOptions
 * @description RequestOptions 接口定义了向服务器发起请求时的一些可选配置选项，用于定制 HTTP 请求的行为和结果处理方式。
 *
 * - `joinParamsToUrl`（可选，布尔类型，默认值未指定）：是否将请求参数拼接到 URL 中。
 * - `formatDate`（可选，布尔类型，默认值未指定）：是否对请求参数中的时间进行格式化处理。
 * - `isTransformResponse`（可选，布尔类型，默认值未指定）：是否对请求的结果进行处理（例如转换 JSON 格式）。
 * - `isReturnNativeResponse`（可选，布尔类型，默认值未指定）：是否返回原生的 HTTP 响应对象，便于获取响应头信息等。
 * - `apiUrl`（可选，字符串或返回字符串的函数类型，默认值未指定）：接口地址，如果不指定，则使用默认的 apiUrl。
 * - `errorMessageMode`（可选，'none' | 'modal' | 'message' | undefined 类型，默认值未指定）：错误信息提示模式，决定了错误信息如何展示给用户。
 * - `joinTime`（可选，布尔类型，默认值未指定）：是否在请求中添加时间戳。
 * - `ignoreCancelToken`（可选，布尔类型，默认值未指定）：是否忽略取消请求的令牌（cancel token）。
 * - `withToken`（可选，布尔类型，默认值未指定）：是否在请求头中携带 token 信息。
 */
export interface RequestOptions {
  joinParamsToUrl?: boolean
  formatDate?: boolean
  isTransformResponse?: boolean
  isReturnNativeResponse?: boolean
  apiUrl?: string | (() => string)
  errorMessageMode?: 'none' | 'modal' | 'message' | undefined
  joinTime?: boolean
  ignoreCancelToken?: boolean
  withToken?: boolean
}
