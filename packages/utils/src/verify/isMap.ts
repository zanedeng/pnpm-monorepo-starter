import { is } from './is'
/**
 * 用于检测给定的未知类型值 `val` 是否为 ES6 中的 Map 数据结构实例。
 * 这个函数通过调用导入的 `is` 函数，并传入 `'Map'` 作为预期的内部类型名称，判断 `val` 是否为 Map 类型。
 *
 * @function isMap
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is Map<any, any>} - 如果 `val` 是 Map 类型实例，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `Map<any, any>` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 Map 类型。
 *
 * @example
 * ```typescript
 * import { isMap } from '@zkj/utils';
 *
 * const mapInstance = new Map();
 * const notAMapInstance: unknown = {};
 *
 * if (isMap(mapInstance)) {
 *   console.log('mapInstance is a Map.');
 *   // 在此处，TypeScript会推断mapInstance为Map类型，可以安全地调用Map的方法
 *   mapInstance.set('key', 'value');
 * }
 *
 * if (!isMap(notAMapInstance)) {
 *   console.log('notAMapInstance is not a Map.');
 *   // 在此处，TypeScript知道notAMapInstance不可能是Map类型
 * }
 * ```
 */
export const isMap = (val: unknown): val is Map<any, any> => is(val, 'Map')
