import { is } from './is'
/**
 * 用于检测给定的未知类型值 `val` 是否为 JavaScript 的正则表达式类型（RegExp）。
 * 这个函数通过调用导入的 `is` 函数，并传入 `'RegExp'` 作为预期的内部类型名称，判断 `val` 是否为正则表达式类型。
 *
 * @function isRegExp
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is RegExp} - 如果 `val` 是正则表达式类型，则返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `RegExp` 类型；
 * 否则返回 `false`，并且 TypeScript 认为 `val` 不是 `RegExp` 类型。
 *
 * @example
 * ```typescript
 * import { isRegExp } from '@zkj/utils';
 *
 * const regex: unknown = /ab+c/;
 * const notRegex: unknown = 'Not a regex';
 *
 * if (isRegExp(regex)) {
 *   console.log('regex is a regular expression.');
 *   // 在此处，TypeScript会推断regex为RegExp类型，可以安全地调用其方法
 *   const match = regex.test('abc');
 * }
 *
 * if (!isRegExp(notRegex)) {
 *   console.log('notRegex is not a regular expression.');
 *   // 在此处，TypeScript知道notRegex不可能是RegExp类型
 * }
 * ```
 */
export const isRegExp = (val: unknown): val is RegExp => is(val, 'RegExp')
