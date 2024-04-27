/**
 * 获取网页图像URL
 * @function getWebpageImageUrl
 * @returns {string} - 返回当前网页的图像URL，优先级如下：
 *   1. 页面中Open Graph协议定义的图片元数据（og:image）
 *   2. 页面中第一个img元素的src属性
 *   若上述两者都不存在，则返回空字符串
 *
 * @description
 * 此函数用于从当前网页中提取代表该页面的图像URL。首先查找Open Graph协议定义的图片元数据，
 * 若找不到，则尝试获取页面中第一个img元素的src属性作为图像URL。
 *
 * @example
 * ```javascript
 * const webpageImageUrl = getWebpageImageUrl();
 * console.log(webpageImageUrl); // 输出当前网页的代表性图像URL
 * ```
 */
export const getWebpageImageUrl = () => {
  // 查找Open Graph协议定义的图片元数据
  const metaImage = document.querySelector('meta[property="og:image"]')
  if (metaImage) {
    // 若找到，则返回其内容属性作为图像URL
    return metaImage.getAttribute('content')
  }

  // 若Open Graph协议的图片元数据不存在，则尝试获取页面中第一个img元素的src属性
  const firstImage = document.images[0]
  if (firstImage) {
    // 若找到第一个img元素，则返回其src属性作为图像URL
    return firstImage.src
  }

  // 若以上两种情况均未找到图像URL，则返回空字符串
  return ''
}
