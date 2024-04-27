import { cacheStringFunction } from './cacheString'

/**
 * 将字符串首字母转换为大写并进行了缓存优化的内部函数
 * @param {string} str - 输入字符串
 * @returns {string} - 首字母大写的字符串
 */
const _capitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
)

/**
 * 将字符串的首字母转换为大写，并确保返回值类型为首字母大写的字符串
 * @template T - 输入字符串类型
 * @param {T} str - 输入字符串
 * @returns {Capitalize<T>} - 首字母大写的字符串
 */
export const capitalize = <T extends string>(str: T) =>
  _capitalize(str) as Capitalize<T>
