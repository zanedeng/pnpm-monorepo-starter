/**
 * 用于检测传入的任意类型值 `val` 是否严格等于 `undefined`。
 *
 * @function isUndef
 * @param {any} val - 需要检测类型的任意值。
 * @returns {val is undefined} - 如果 `val` 严格等于 `undefined`，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `undefined` 类型；
 * 如果 `val` 不等于 `undefined`，则返回 `false`，同时 TypeScript 认为 `val` 不是 `undefined` 类型。
 *
 * @example
 * ```typescript
 * import { isUndef } from '@zkj/utils';
 *
 * const maybeUndefined: number | undefined = undefined;
 * const definitelyNotNull: number = 42;
 *
 * if (isUndef(maybeUndefined)) {
 *   console.log('maybeUndefined is undefined');
 *   // 在此处，TypeScript会推断maybeUndefined为undefined类型
 * }
 *
 * if (!isUndef(definitelyNotNull)) {
 *   console.log('definitelyNotNull is not undefined');
 *   // 在此处，TypeScript知道definitelyNotNull不可能是undefined类型
 * }
 * ```
 */
export const isUndef = (val: any): val is undefined => val === undefined
