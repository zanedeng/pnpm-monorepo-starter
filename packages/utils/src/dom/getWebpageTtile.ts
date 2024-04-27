/**
 * 获取网页标题
 * @function getWebpageTitle
 * @returns {string} - 返回当前网页的标题，查找顺序如下：
 *   1. 页面<head>标签内的<title>元素文本内容
 *   2. Open Graph协议定义的网页标题（og:title属性的<meta>标签content属性值）
 *   若以上两种方式均未找到标题，则返回"No Title"
 *
 * @description
 * 此函数用于从当前网页中提取网页标题。首先查找常规的HTML `<title>` 元素内容，
 * 若未找到，则尝试通过Open Graph协议定义的 `<meta property="og:title">` 元素获取网页标题。
 * 若仍然未能找到有效标题，则返回预设字符串 "No Title"。
 *
 * @example
 * ```javascript
 * const pageTitle = getWebpageTitle();
 * console.log(pageTitle); // 输出当前网页的标题
 * ```
 */
export const getWebpageTitle = () => {
  // 查找head标签内的title元素，并获取其文本内容
  const titleElement = document.querySelector('head title')
  if (titleElement && titleElement.textContent) {
    return titleElement.textContent
  }
  // 若title元素不存在或没有文本内容，则查找og:title属性的meta标签，获取其content属性值（即网页标题）
  const ogTitleMeta = document.querySelector('meta[property="og:title"]')
  if (ogTitleMeta && ogTitleMeta.getAttribute('content')) {
    return ogTitleMeta.getAttribute('content')
  }
  // 若既没有找到title元素也没有找到og:title元标签，则返回"No Title"
  return 'No Title'
}
