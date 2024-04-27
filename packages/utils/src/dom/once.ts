import { off } from './off'
import { on } from './on'

/**
 * 添加仅触发一次的事件监听器
 * @function once
 * @param {HTMLElement} el - 目标元素，这里限定为HTML元素
 * @param {string} event - 事件名称，例如 'click'、'mouseover' 等
 * @param {EventListener} fn - 事件处理器，当事件触发时执行的回调函数
 * @returns {void}
 *
 * @description
 * 该函数用于为目标元素添加一个仅触发一次的事件监听器。当事件首次触发时，会执行传入的回调函数，随后自动移除该事件监听器。
 *
 * 示例:
 * ```javascript
 * const myButton = document.getElementById('my-button');
 * const handleFirstClick = () => {
 *   console.log('This message will only appear on the first click.');
 * };
 *
 * // 添加只触发一次的点击事件监听器
 * once(myButton, 'click', handleFirstClick);
 * ```
 */
export function once(el: HTMLElement, event: string, fn: EventListener): void {
  // 创建内部事件监听器函数
  const listener = function (this: any, ...args: [evt: Event]) {
    if (fn) {
      // 执行传入的回调函数
      fn.apply(this, args)
    }
    // 移除事件监听器
    off(el, event, listener)
  }
  // 为元素添加事件监听器
  on(el, event, listener)
}
