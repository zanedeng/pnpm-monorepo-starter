/**
 * 用于检测传入的未知类型值 `val` 是否为非 `null` 的 JavaScript 对象类型（包括普通对象和函数等）。
 *
 * @function isObject
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is Record<any, any>} - 如果 `val` 是非 `null` 的对象类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为具有任意属性和任意值类型的记录（Record）类型；
 * 如果 `val` 不是非 `null` 的对象类型，则返回 `false`，并且 TypeScript 认为 `val` 不是 `Record<any, any>` 类型。
 *
 * @example
 * ```typescript
 * import { isObject } from '@zkj/utils';
 *
 * const objectValue: unknown = { key: 'value' };
 * const notAnObjectValue: unknown = 'I am a string';
 * const nullValue: unknown = null;
 *
 * if (isObject(objectValue)) {
 *   console.log('objectValue is an object.');
 *   // 在此处，TypeScript会推断objectValue为Record<any, any>类型，可以安全地访问其属性
 *   const value = objectValue.key;
 * }
 *
 * if (!isObject(notAnObjectValue)) {
 *   console.log('notAnObjectValue is not an object.');
 *   // 在此处，TypeScript知道notAnObjectValue不可能是Record<any, any>类型
 * }
 *
 * if (!isObject(nullValue)) {
 *   console.log('nullValue is not an object.');
 *   // 在此处，TypeScript知道nullValue不可能是Record<any, any>类型
 * }
 * ```
 */
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
