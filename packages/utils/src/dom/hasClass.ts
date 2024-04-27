/**
 * 检查元素是否包含指定类名
 * @function hasClass
 * @param {Element} el - 要检查的HTML元素
 * @param {string} cls - 要查找的类名
 * @returns {boolean} - 如果元素包含指定类名，则返回true；否则返回false
 *
 * @description
 * 此函数用于检测给定的HTML元素`el`是否含有特定的CSS类名`cls`。
 * 如果传入的`el`或`cls`为空，则直接返回false。
 * 如果类名字符串`cls`包含空格，则抛出错误，提示不应该包含空格。
 * 对于支持classList API的现代浏览器，直接使用`el.classList.contains(cls)`方法判断。
 * 对于不支持classList API的老式浏览器，通过切分和比较元素的className属性来实现同样的功能。

 * @example
 * ```typescript
 * const myElement = document.getElementById('myDiv');
 * if (hasClass(myElement, 'active')) {
 *   console.log('Element has the class "active"');
 * } else {
 *   console.log('Element does not have the class "active"');
 * }
 * ```
 */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.') // 类名不应包含空格，若包含则抛出错误

  // 若浏览器支持classList API
  if (el.classList) {
    return el.classList.contains(cls) // 使用contains方法检查类名是否存在
  } else {
    // 对于不支持classList的浏览器
    const className = ` ${el.className} ` // 在类名前后添加空格便于精确匹配
    return className.indexOf(` ${cls} `) > -1 // 查找类名是否存在
  }
}
