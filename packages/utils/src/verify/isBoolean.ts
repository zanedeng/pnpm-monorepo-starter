import { is } from './is'

/**
 * 导出 `isBoolean` 函数，该函数专门用于检测给定的未知类型值是否为布尔类型。
 *
 * @function isBoolean
 * @param {unknown} val - 需要检测类型的值。
 * @returns {val is Boolean} - 如果 `val` 的类型是布尔类型，则返回 `true`，同时 TypeScript 类型系统也会认为此时 `val` 确实是 `Boolean` 类型；
 * 否则返回 `false`，且 TypeScript 认为 `val` 不是 `Boolean` 类型。
 *
 * @example
 * ```typescript
 * import { isBoolean } from '@zkj/utils';
 *
 * let testVal: unknown = true;
 * if (isBoolean(testVal)) {
 *   // 在此处，TypeScript会自动推断testVal为boolean类型
 *   console.log(testVal && 'It is a boolean');  // 输出: "It is a boolean"
 * }
 * ```
 */
export const isBoolean = (val: unknown): val is Boolean => is(val, 'Boolean')
