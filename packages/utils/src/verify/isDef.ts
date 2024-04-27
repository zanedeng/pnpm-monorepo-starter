/**
 * 用于判断传入的参数 `val` 是否已定义，即不是 `undefined` 类型。
 *
 * @function isDef
 * @param {any} val - 需要检测类型的任意值。
 * @returns {val is undefined} - 返回一个类型断言结果，如果 `val` 不等于 `undefined`，则返回 `false`，同时 TypeScript 类型系统会在此上下文中认为 `val` 不是 `undefined` 类型；
 * 如果 `val` 等于 `undefined`，则返回 `true`，同时 TypeScript 认为 `val` 是 `undefined` 类型。
 *
 * @example
 * ```typescript
 * import { isDef } from './utils';
 *
 * let myValue: number | undefined = 42;
 * if (isDef(myValue)) {
 *   console.log('myValue has a defined value:', myValue); // 输出："myValue has a defined value: 42"
 *   // 在此处，TypeScript知道myValue不可能是undefined，因此可以安全地对其进行操作
 * }
 *
 * myValue = undefined;
 * if (!isDef(myValue)) {
 *   console.log('myValue is undefined'); // 输出："myValue is undefined"
 *   // 在此处，TypeScript知道myValue一定是undefined
 * }
 * ```
 */
export const isDef = (val: any): val is undefined => val !== undefined
