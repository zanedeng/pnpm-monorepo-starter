import { cacheStringFunction } from './cacheString'

/**
 * 正则表达式，用于匹配以短横线（-）分隔的单词，并捕获紧随短横线之后的字符
 * @type {RegExp}
 */
const camelizeRE = /-(\w)/g

/**
 * 将短横线分隔的字符串转换为驼峰式命名的字符串，并进行了缓存优化
 * @param {string} str - 输入的短横线分隔的字符串
 * @returns {string} - 转换为驼峰式的字符串
 */
export const camelize = cacheStringFunction((str: string): string =>
  str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
)
