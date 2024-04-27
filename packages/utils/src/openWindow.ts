/**
 * @function openWindow
 * @description 打开一个新的浏览器窗口或标签页，并可以自定义目标窗口、noopener 和 noreferrer 等属性。
 *
 * @param {string} url - 要在新窗口中加载的网页 URL 地址。
 * @param {Object} [opt] - 可选参数对象，用于配置新窗口的一些属性。
 * @param {TargetContext|string} [opt.target='__blank'] - 指定新窗口或标签页的目标环境，可选值为 `TargetContext` 枚举类型或字符串。默认值为 `'__blank'`，表示在新标签页中打开链接。
 * @param {boolean} [opt.noopener=true] - 是否阻止新窗口获取对打开它的窗口的引用，防止恶意脚本操控原始窗口。默认值为 `true`。
 * @param {boolean} [opt.noreferrer=true] - 是否在新窗口发出的请求中禁用 HTTP Referrer（来源地址头）。默认值为 `true`，有助于提高隐私性和安全性。

 * @example
 * ```javascript
 * openWindow('https://example.com', {
 *   target: '_self',
 *   noopener: false,
 *   noreferrer: false,
 * });
 * ```
 *
 * @returns {Window} - 返回新打开的窗口对象。注意，某些浏览器的安全策略可能会阻止返回值。
 */
export function openWindow(
  url: string,
  opt?: {
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    noopener?: boolean
    noreferrer?: boolean
  }
) {
  // 从 opt 参数中提取 target、noopener 和 noreferrer 属性，并设置默认值
  const { target = '_blank', noopener = true, noreferrer = true } = opt || {}
  // 初始化一个字符串数组，用于存储新窗口的特性（features）
  const feature: string[] = []

  // 根据 noopener 和 noreferrer 的值添加对应特性到 feature 数组中
  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')
  // 使用 window.open 方法打开新窗口，传递 URL、目标以及特性的字符串形式
  window.open(url, target, feature.join(','))
}
