import { is } from './is'
/**
 * 用于检测给定的未知类型值 `val` 是否为纯JavaScript对象（即除了null以外的对象字面量或new Object()创建的对象）。
 * 这个函数通过调用导入的 `is` 函数，并传入 `'Object'` 作为预期的内部类型名称，判断 `val` 是否为普通对象类型。
 *
 * @function isPlainObject
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is object} - 如果 `val` 是一个普通JavaScript对象，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `object` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 `object` 类型（注意，此类型不包括null、数组、函数以及其他内置对象）。
 *
 * @example
 * ```typescript
 * import { isPlainObject } from '@zkj/utils';
 *
 * const plainObject: unknown = { key: 'value' };
 * const notPlainObject: unknown = new Date();
 *
 * if (isPlainObject(plainObject)) {
 *   console.log('plainObject is a plain JavaScript object.');
 *   // 在此处，TypeScript会推断plainObject为object类型，可以安全地访问其属性
 *   const value = plainObject.key;
 * }
 *
 * if (!isPlainObject(notPlainObject)) {
 *   console.log('notPlainObject is not a plain JavaScript object.');
 *   // 在此处，TypeScript知道notPlainObject不可能是object类型
 * }
 * ```
 */
export const isPlainObject = (val: unknown): val is object => is(val, 'Object')
