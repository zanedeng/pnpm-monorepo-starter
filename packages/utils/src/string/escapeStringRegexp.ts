/**
 * 对字符串进行转义，使其可以安全地用作正则表达式的模式
 * @param {string} [str =''] - 需要转义的字符串，默认为空字符串
 * @returns {string} - 已转义的字符串
 */
export const escapeStringRegexp = (str = '') =>
  str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
