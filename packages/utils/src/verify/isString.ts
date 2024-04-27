/**
 * 用于检测传入的未知类型值 `val` 是否为 JavaScript 字符串类型。
 *
 * @function isString
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is string} - 如果 `val` 是字符串类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `string` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 `string` 类型。
 *
 * @example
 * ```typescript
 * import { isString } from '@zkj/utils';
 *
 * const stringValue: unknown = 'Hello, world!';
 * const notAStringValue: unknown = 42;
 *
 * if (isString(stringValue)) {
 *   console.log('stringValue is a string.');
 *   // 在此处，TypeScript会推断stringValue为string类型，可以安全地进行字符串操作
 *   const length = stringValue.length;
 * }
 *
 * if (!isString(notAStringValue)) {
 *   console.log('notAStringValue is not a string.');
 *   // 在此处，TypeScript知道notAStringValue不可能是string类型
 * }
 * ```
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
