/**
 * 获取指定DOM元素的边界信息
 * @function getBoundingClientRect
 * @param {Element} element - 需要获取边界信息的DOM元素
 * @returns {DOMRect | number} - 返回元素的边界矩形信息（DOMRect类型），如果无法获取或者传入参数不是有效的DOM元素，则返回0
 *
 * @description
 * 此函数用于获取DOM元素在其视口坐标系统中的精确位置和尺寸信息，返回一个包含top、right、bottom、left、width和height等属性的对象。
 * 如果传入的元素无效（例如未找到元素或元素没有getBoundingClientRect方法），则返回数字0作为错误提示。
 *
 * @example
 * ```javascript
 * const myElement = document.getElementById('my-element');
 * const bounds = getBoundingClientRect(myElement);
 * console.log(bounds.width, bounds.height, bounds.top, bounds.left);
 * ```
 */
export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}
