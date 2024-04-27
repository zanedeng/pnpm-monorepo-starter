import { is } from './is'
/**
 * 用于检测给定的未知类型值 `val` 是否为 JavaScript 的 Set 数据结构类型。
 * 这个函数通过调用导入的 `is` 函数，并传入 `'Set'` 作为预期的内部类型名称，判断 `val` 是否为 Set 类型。
 *
 * @function isSet
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is Set<any>} - 如果 `val` 是 Set 类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `Set<any>` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 `Set<any>` 类型。
 *
 * @example
 * ```typescript
 * import { isSet } from '@zkj/utils';
 *
 * const setInstance: unknown = new Set([1, 2, 3]);
 * const notASetInstance: unknown = ['Not a set'];
 *
 * if (isSet(setInstance)) {
 *   console.log('setInstance is a Set.');
 *   // 在此处，TypeScript会推断setInstance为Set<any>类型，可以安全地调用Set的方法
 *   setInstance.add(4);
 * }
 *
 * if (!isSet(notASetInstance)) {
 *   console.log('notASetInstance is not a Set.');
 *   // 在此处，TypeScript知道notASetInstance不可能是Set<any>类型
 * }
 * ```
 */
export const isSet = (val: unknown): val is Set<any> => is(val, 'Set')
