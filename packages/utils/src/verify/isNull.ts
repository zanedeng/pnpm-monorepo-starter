/**
 * 用于判断传入的未知类型值 `val` 是否严格等于 `null`。
 *
 * @function isNull
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is null} - 如果 `val` 严格等于 `null`，则返回 `true`，同时 TypeScript 类型系统会在此上下文中认为 `val` 确实是 `null` 类型；
 * 如果 `val` 不等于 `null`，则返回 `false`，同时 TypeScript 认为 `val` 不是 `null` 类型。
 *
 * @example
 * ```typescript
 * import { isNull } from '@zkj/utils';
 *
 * const nullableValue: number | null = null;
 * const nonNullableValue: number = 42;
 *
 * if (isNull(nullableValue)) {
 *   console.log('nullableValue is null');
 *   // 在这里，TypeScript会知道nullableValue是null类型
 * }
 *
 * if (!isNull(nonNullableValue)) {
 *   console.log('nonNullableValue is not null');
 *   // 在这里，TypeScript知道nonNullableValue不可能是null类型
 * }
 * ```
 */
export function isNull(val: unknown): val is null {
  return val === null
}
