import { is } from './is'
/**
 * 用于检测给定的未知类型值 `val` 是否为 JavaScript 中的 Number 类型。
 * 这个函数通过调用导入的 `is` 函数，并传入 `'Number'` 作为预期的内部类型名称，判断 `val` 是否为数字类型。
 *
 * @function isNumber
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is Number} - 如果 `val` 是 Number 类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `Number` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 Number 类型。
 *
 * @example
 * ```typescript
 * import { isNumber } from '@zkj/utils';
 *
 * const numberValue: unknown = 42;
 * const notANumberValue: unknown = 'Forty Two';
 *
 * if (isNumber(numberValue)) {
 *   console.log('numberValue is a Number.');
 *   // 在此处，TypeScript会推断numberValue为Number类型，可以安全地进行数值运算
 *   const result = numberValue + 1;
 * }
 *
 * if (!isNumber(notANumberValue)) {
 *   console.log('notANumberValue is not a Number.');
 *   // 在此处，TypeScript知道notANumberValue不可能是Number类型
 * }
 * ```
 */
export const isNumber = (val: unknown): val is Number => is(val, 'Number')
