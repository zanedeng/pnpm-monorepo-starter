/**
 * 添加事件监听器
 * @function on
 * @param {Element | HTMLElement | Document | Window} element - 目标元素，可以是HTML元素、文档对象或窗口对象
 * @param {string} event - 事件名称，例如 'click'、'scroll' 等
 * @param {EventListenerOrEventListenerObject} handler - 事件处理器，可以是事件监听器函数，也可以是实现了EventListener接口的对象
 * @returns {void}
 *
 * @description
 * 该函数用于为目标元素添加指定类型的事件监听器。当事件被触发时，将会执行传入的事件处理器函数或对象的方法。
 *
 * 示例:
 * ```javascript
 * const myButton = document.getElementById('my-button');
 * const handleClick = (event) => {
 *   console.log('Button was clicked!');
 * };
 *
 * // 添加点击事件监听器
 * on(myButton, 'click', handleClick);
 * ```
 */
export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  if (element && event && handler) {
    // 添加事件监听器，第三个参数为false表示事件冒泡阶段触发处理程序
    element.addEventListener(event, handler, false)
  }
}
