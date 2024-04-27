import { is } from './is'
/**
 * 用于检测给定的值是否为 `Date` 类型。
 * 此函数通过调用导入的 `is` 函数，并传入 `'Date'` 作为期望的内部类型名称，以此确定给定值是否为日期类型。
 *
 * @function isDate
 * @param {unknown} val - 需要检测类型的未知值。
 * @returns {val is Date} - 如果 `val` 是 `Date` 类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `Date` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 `Date` 类型。
 *
 * @example
 * ```typescript
 * import { isDate } from './is';
 *
 * const dateValue = new Date();
 * const otherValue: unknown = 'This is not a date';
 *
 * if (isDate(dateValue)) {
 *   console.log('dateValue is indeed a Date instance:');
 *   console.log(dateValue.toDateString());
 * }
 *
 * if (!isDate(otherValue)) {
 *   console.log('otherValue is not a Date instance.');
 * }
 * ```
 */
export const isDate = (val: unknown): val is Date => is(val, 'Date')
