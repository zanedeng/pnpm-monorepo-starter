import { isNull } from './isNull'
import { isUndef } from './isUndef'
/**
 * 用于判断传入的未知类型值 `val` 是否为 `null` 或者 `undefined`。
 *
 * @function isNullOrUnDef
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is null | undefined} - 如果 `val` 为 `null` 或 `undefined`，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `null | undefined` 类型；
 * 如果 `val` 不是 `null` 或 `undefined`，则返回 `false`，同时 TypeScript 认为 `val` 不是 `null | undefined` 类型。
 *
 * @example
 * ```typescript
 * import { isNullOrUnDef } from '@zkj/utils';
 *
 * const nullableOrUndefinedValue: number | null | undefined = undefined;
 * const nonNullableValue: number = 42;
 *
 * if (isNullOrUnDef(nullableOrUndefinedValue)) {
 *   console.log('nullableOrUndefinedValue is either null or undefined');
 *   // 在这里，TypeScript会知道nullableOrUndefinedValue可能是null或undefined类型
 * }
 *
 * if (!isNullOrUnDef(nonNullableValue)) {
 *   console.log('nonNullableValue is neither null nor undefined');
 *   // 在这里，TypeScript知道nonNullableValue不可能是null或undefined类型
 * }
 * ```
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUndef(val) || isNull(val)
}
