/**
 * 判断一个字符串路径（path）是否符合HTTP(S) URL格式。
 *
 * @function isHttpUrl
 * @param {string} path - 待验证的字符串，可能是或者可能不是一个HTTP或HTTPS协议的URL。
 * @returns {boolean} - 如果 `path` 符合HTTP或HTTPS URL的标准格式，则返回 `true`，否则返回 `false`。
 *
 * @description
 * 该函数通过正则表达式对输入的字符串路径进行测试，以确定它是否遵循标准HTTP或HTTPS URL的格式。
 * 正则表达式 `/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/` 匹配以下模式：
 * - 开头是 'http://' 或 'https://'
 * - 接着是一系列由点分隔的小写字母、数字和破折号组成的域名
 * - 结束于顶级域名，并可选地带有额外的路径、查询参数等部分
 */
export function isHttpUrl(path: string): boolean {
  // 定义用于检测HTTP(S) URL的正则表达式
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
  // 使用正则表达式的test方法检测输入的路径是否匹配HTTP(S) URL格式
  return reg.test(path)
}
