/**
 * 导出 `Object.prototype.toString` 方法到变量 `objectToString`，以便于直接访问并判断任意值的内部类型。
 *
 * @export
 * @constant
 * @name objectToString
 * @type {Function}
 */
export const objectToString = Object.prototype.toString

/**
 * 判断给定的 `value` 是否具有指定的内部 JavaScript 类型。
 *
 * @export
 * @function
 * @param {unknown} value - 需要检查类型的任意值。
 * @param {string} type - 要比较的内部类型名称，例如 `'Array'`, `'String'`, `'Number'`, `'Object'`, `'Function'` 等。
 * @returns {boolean} - 如果 `value` 的内部类型与 `type` 参数完全匹配，则返回 `true`，否则返回 `false`。
 *
 * @example
 * ```ts
 * import { is } from '@zkj/utils';
 *
 * const arr = [];
 * const str = 'hello';
 * const num = 42;
 *
 * console.log(is(arr, 'Array')); // 输出: true
 * console.log(is(str, 'String')); // 输出: true
 * console.log(is(num, 'Number')); // 输出: true
 * ```
 */
export const is = (value: unknown, type: string): boolean =>
  objectToString.call(value) === `[object ${type}]`
