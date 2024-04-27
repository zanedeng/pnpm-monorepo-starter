import { isArray } from './isArray'
import { isObject } from './isObject'

/**
 * 用于判断给定的未知类型值是否为空。
 * - 如果 `val` 是 falsy 值（如 null、undefined 或 false）或数字0，则认为为空。
 * - 如果 `val` 是数组且长度为0，则认为为空数组。
 * - 如果 `val` 是对象（不含null，但可能包含数组）且没有任何自身可枚举属性，则认为为空对象。
 *
 * @function isEmpty
 * @param {unknown} val - 需要检测的任意值。
 * @returns {boolean} - 如果 `val` 为空，则返回 `true`，否则返回 `false`。
 *
 * @example
 * ```typescript
 * import { isEmpty } from '@zkj/utils';
 *
 * console.log(isEmpty(null));       // 输出: true
 * console.log(isEmpty(undefined)); // 输出: true
 * console.log(isEmpty(false));     // 输出: true
 * console.log(isEmpty(0));         // 输出: true
 * console.log(isEmpty(''));        // 输出: false
 *
 * const emptyArray: number[] = [];
 * console.log(isEmpty(emptyArray)); // 输出: true
 *
 * const nonEmptyArray: number[] = [1, 2, 3];
 * console.log(isEmpty(nonEmptyArray)); // 输出: false
 *
 * const emptyObject: object = {};
 * console.log(isEmpty(emptyObject)); // 输出: true
 *
 * const nonEmptyObject: object = { a: 1, b: 2 };
 * console.log(isEmpty(nonEmptyObject)); // 输出: false
 * ```
 */
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)
