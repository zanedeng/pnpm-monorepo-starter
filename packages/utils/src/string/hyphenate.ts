import { cacheStringFunction } from './cacheString'

/**
 * 正则表达式，用于匹配非边界处的大写字母
 * @type {RegExp}
 */
const hyphenateRE = /\B([A-Z])/g

/**
 * 将驼峰式或PascalCase命名的字符串转换为短横线分隔的格式，并进行了缓存优化
 * @param {string} str - 输入的驼峰式或PascalCase命名的字符串
 * @returns {string} - 转换为短横线分隔格式的字符串
 */
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()
)
