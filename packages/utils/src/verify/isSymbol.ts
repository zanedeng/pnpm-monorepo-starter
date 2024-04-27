/**
 * 用于检测传入的未知类型值 `val` 是否为 JavaScript 符号（symbol）类型。
 *
 * @function isSymbol
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is symbol} - 如果 `val` 是符号类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `symbol` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 `symbol` 类型。
 *
 * @example
 * ```typescript
 * import { isSymbol } from '@zkj/utils';
 *
 * const symbolValue: unknown = Symbol('key');
 * const notASymbolValue: unknown = 'I am not a symbol';
 *
 * if (isSymbol(symbolValue)) {
 *   console.log('symbolValue is a symbol.');
 *   // 在此处，TypeScript会推断symbolValue为symbol类型
 * }
 *
 * if (!isSymbol(notASymbolValue)) {
 *   console.log('notASymbolValue is not a symbol.');
 *   // 在此处，TypeScript知道notASymbolValue不可能是symbol类型
 * }
 * ```
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
