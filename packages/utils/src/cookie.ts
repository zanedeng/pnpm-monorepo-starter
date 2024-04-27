/**
 * 获取当前域名，仅保留顶级域名和二级域名
 * @returns {string} 当前域名（例如："example.com"）
 */
function getCurrentDomain() {
  const hostnameArray = window.location.hostname.split('.')
  return `.${hostnameArray.slice(-2).join('.')}`
}

/**
 * 设置cookie
 * @param {string} name - Cookie名称
 * @param {string|number} val - Cookie值，可以是字符串或数字类型
 * @param {number} expires - Cookie过期时间（单位为秒）
 * @param {string} [domain] - Cookie作用域域名，默认取当前域名
 * @description
 * 设置一个带有指定名称、值、过期时间和可选域名的Cookie。
 */
export function setCookie(
  name: string,
  val: string | number,
  expires: number,
  domain: string
) {
  let text = String(window.encodeURIComponent(val))
  const date = new Date()
  date.setTime(date.getTime() + Number(expires) * 1000)
  text += `; expires=${date.toUTCString()}`
  // 设置路径
  text += '; path=/'
  // 设置域名，如果提供了domain参数且不为空，则使用指定的域名，否则使用当前域名
  if (typeof domain != 'undefined' && domain != '') {
    text += `; domain=${getCurrentDomain()}`
  }
  // 设置Cookie
  document.cookie = `${name}=${text}`
}

/**
 * 获取cookie
 * @param {string} name - Cookie名称
 * @returns {string|undefined} - 返回指定名称的Cookie值，如果未找到，则返回undefined
 * @description
 * 根据指定的Cookie名称检索并返回其值。
 */
export function getCookie(name: string) {
  const cookieSplitResult = document.cookie.split('; ')
  for (let i = 0; i < cookieSplitResult.length; i++) {
    const temp = cookieSplitResult[i].split('=')
    if (temp[0] == name) return unescape(temp[1])
  }
}
