/**
 * 用于判断传入的参数 `e` 是否为 DOM 元素类型。
 *
 * @function isElement
 * @param {unknown} e - 需要检测类型的未知值。
 * @returns {e is Element} - 返回一个类型断言结果，如果当前环境支持 `Element` 类型且 `e` 实例化自 `Element` 类，则返回 `true`，同时 TypeScript 类型系统会在此上下文中认为 `e` 是 `Element` 类型；
 * 若当前环境不支持 `Element` 类型或者 `e` 不是 `Element` 类的实例，则返回 `false`，同时 TypeScript 认为 `e` 不是 `Element` 类型。

 * @example
 * ```typescript
 * import { isElement } from './utils';
 *
 * const divElement = document.createElement('div');
 * const nonElement = 'I am not an Element';
 * 
 * if (isElement(divElement)) {
 *   console.log('divElement is a DOM Element.'); // 输出："divElement is a DOM Element."
 *   // 在此处，TypeScript知道divElement是Element类型，可以安全地调用Element的相关方法
 * }
 * 
 * if (!isElement(nonElement)) {
 *   console.log('nonElement is not a DOM Element.'); // 输出："nonElement is not a DOM Element."
 *   // 在此处，TypeScript知道nonElement不可能是Element类型
 * }
 * ```
 */
export const isElement = (e: unknown): e is Element => {
  // 检查当前环境中是否存在Element类型，防止在不支持DOM环境（如Node.js服务器端）下报错
  if (typeof Element === 'undefined') return false
  // 如果环境支持Element类型，进一步检查给定值是否是Element类型的实例
  return e instanceof Element
}
