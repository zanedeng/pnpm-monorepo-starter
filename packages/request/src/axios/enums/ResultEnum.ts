/**
 * @enum ResultEnum
 * @description 定义了一个枚举类型 `ResultEnum`，用于表示操作结果的不同状态码和类型。
 */
export enum ResultEnum {
  /**
   * @member {number} SUCCESS
   * @description 成功状态，对应状态码为 0。
   */
  SUCCESS = 0,

  /**
   * @member {number} ERROR
   * @description 错误状态，对应状态码为 1。
   */
  ERROR = 1,

  /**
   * @member {number} TIMEOUT
   * @description 超时状态，这里使用了非标准 HTTP 状态码 401 来表示超时错误（通常 401 用于未授权，但此处可根据项目需求自定义）。
   */
  TIMEOUT = 401,

  /**
   * @member {'success'} TYPE
   * @description 类型成员，这里的 'success' 是字符串类型，不同于前面的状态码成员，它不是用来表示具体的状态码，而是可能用来标识结果类型的字符串标签。
   * 在实际应用中，这个成员的用途可能是在需要区分成功类型与其他类型结果时使用。
   */
  TYPE = 'success',
}
