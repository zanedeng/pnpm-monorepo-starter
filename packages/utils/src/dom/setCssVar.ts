/**
 * @function setCssVar
 * @description 设置指定DOM元素的CSS自定义属性（CSS变量）值。
 * @param {string} prop - CSS自定义属性名，例如 `--my-color`。
 * @param {any} val - CSS自定义属性值，可以是任何有效的CSS值，如字符串、数字或其他CSS数据类型。
 * @param {HTMLElement=} dom - 操作的目标DOM元素，默认为整个文档的根元素 (`document.documentElement`)。
 */
export function setCssVar(
  prop: string,
  val: any,
  dom = document.documentElement
) {
  // 使用DOM元素的style.setProperty方法来设置CSS变量
  dom.style.setProperty(prop, val)
}
