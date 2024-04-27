/**
 * 该函数用于检测给定的字符串 `path` 是否符合 URL 格式。
 *
 * @function isUrl
 * @param {string} path - 待检测的字符串，疑似URL地址。
 * @returns {boolean} - 如果 `path` 符合 URL 格式规则，则返回 `true`，否则返回 `false`。
 *
 * @example
 * ```typescript
 * import { isUrl } from '@zkj/utils';
 *
 * const correctUrl = 'https://www.example.com/path/to/resource?query=param';
 * const incorrectUrl = 'not-a-url';
 *
 * console.log(isUrl(correctUrl)); // 输出: true
 * console.log(isUrl(incorrectUrl)); // 输出: false
 * ```
 *
 * 注：该函数采用正则表达式来匹配URL格式，但并不能保证完全符合RFC标准或覆盖所有URL特殊情况。
 * 正则表达式参考了通用URL格式，但实际使用时可能需要根据具体需求进行微调。
 */
export function isUrl(path: string): boolean {
  // 使用正则表达式匹配URL格式
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  // 使用正则表达式测试字符串是否匹配URL格式
  return reg.test(path)
}
