/**
 * 检测一个值是否为数组类型。
 *
 * @export
 * @function isArray
 * @param {*} value - 待检测的任意值。
 * @returns {boolean} - 如果 `value` 是一个数组，返回 `true`；否则返回 `false`。
 *
 * @example
 * ```typescript
 * import { isArray } from '@zkj/utils';
 *
 * const arr = [1, 2, 3];
 * const obj = { a: 1, b: 2 };
 *
 * console.log(isArray(arr)); // 输出: true
 * console.log(isArray(obj)); // 输出: false
 * ```
 */
export const isArray = Array.isArray
