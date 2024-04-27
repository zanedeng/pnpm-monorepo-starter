import { is } from './is'
/**
 * 用于检测给定的值 `val` 是否为全局 `Window` 对象。
 * 这个函数首先检查全局作用域下 `window` 是否存在（用于区分浏览器环境与非浏览器环境如Node.js服务器端），
 * 然后通过调用 `is` 函数并传入 `'Window'` 作为预期的内部类型名称，进一步判断 `val` 是否为 `Window` 类型。
 *
 * @function isWindow
 * @param {any} val - 需要检测类型的任意值。
 * @returns {val is Window} - 如果 `val` 是全局 `Window` 对象，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `Window` 类型；
 * 如果 `val` 不是全局 `Window` 对象或当前环境没有 `window` 对象，则返回 `false`，同时 TypeScript 认为 `val` 不是 `Window` 类型。
 *
 * @example
 * ```typescript
 * import { isWindow } from '@zkj/utils';
 *
 * if (isWindow(window)) {
 *   console.log('The provided value is the global Window object.');
 *   // 在这里，TypeScript知道window是Window类型，可以安全地调用Window的方法和属性
 *   window.alert('Hello, world!');
 * }
 *
 * const notAWindow: unknown = {};
 * if (!isWindow(notAWindow)) {
 *   console.log('The provided value is not the global Window object.');
 *   // 在这里，TypeScript知道notAWindow不可能是Window类型
 * }
 * ```
 */
export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && is(val, 'Window')
