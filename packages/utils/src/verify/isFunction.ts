/**
 * 用于判断传入的未知类型值 `val` 是否为函数类型。
 *
 * @function isFunction
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is Function} - 如果 `val` 的类型为 `function`，则返回 `true`，同时 TypeScript 类型系统会在此上下文中认为 `val` 确实是 `Function` 类型；
 * 如果 `val` 的类型不是 `function`，则返回 `false`，同时 TypeScript 认为 `val` 不是 `Function` 类型。
 *
 * @example
 * ```typescript
 * import { isFunction } from '@zkj/utils';
 *
 * const func: () => void = () => console.log('I am a function');
 * const notFunc: number = 42;
 *
 * if (isFunction(func)) {
 *   console.log('func is a function');
 *   // 在这里，TypeScript会知道func确实是函数类型，可以安全地调用
 *   func();
 * }
 *
 * if (!isFunction(notFunc)) {
 *   console.log('notFunc is not a function');
 *   // 在这里，TypeScript知道notFunc不可能是函数类型
 * }
 * ```
 */
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
