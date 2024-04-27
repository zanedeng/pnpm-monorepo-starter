/**
 * 移除事件监听器
 * @function off
 * @param {Element | HTMLElement | Document | Window} element - 目标元素，可以是HTML元素、文档对象或窗口对象
 * @param {string} event - 事件名称，例如 'click'、'scroll' 等
 * @param {EventListenerOrEventListenerObject} handler - 待移除的事件处理器，可以是事件监听器函数，也可以是实现了EventListener接口的对象
 * @returns {void}
 *
 * @description
 * 该函数用于从给定的元素上移除指定类型的事件监听器。只需提供目标元素、事件名称和之前绑定的事件处理器即可。
 *
 * 示例:
 * ```javascript
 * const myButton = document.getElementById('my-button');
 * const handleClick = (event) => {
 *   console.log('Button was clicked!');
 * };
 *
 * // 绑定事件处理器
 * on(myButton, 'click', handleClick);
 *
 * // 移除事件处理器
 * off(myButton, 'click', handleClick);
 * ```
 */
export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  if (element && event && handler) {
    // 移除事件监听器
    element.removeEventListener(event, handler, false)
  }
}
