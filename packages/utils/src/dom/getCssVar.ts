/**
 * @function getCssVar
 * @description 获取指定DOM元素上CSS自定义属性（CSS变量）的当前值。
 * @param {string} prop - 需要获取的CSS自定义属性名，例如 `--my-color`。
 * @param {HTMLElement=} dom - 需要查询的DOM元素，默认为整个文档的根元素 (`document.documentElement`)。
 * @returns {string} - 返回查询到的CSS自定义属性的值，结果为字符串类型。
 */
export function getCssVar(
  prop: string,
  dom: HTMLElement = document.documentElement
) {
  // 使用DOM元素的style.getPropertyValue方法来获取CSS变量的值
  return dom.style.getPropertyValue(prop)
}
