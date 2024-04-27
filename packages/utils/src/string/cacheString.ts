/**
 * 创建一个高阶函数 `cacheStringFunction`，该函数接收一个处理字符串的函数作为参数，并对该函数进行缓存优化。
 * 泛型 T 表示接收和返回值均为 `(str: string) => string` 类型的函数。
 * @template T - 被缓存的字符串处理函数类型
 * @param {T} fn - 待缓存的字符串处理函数
 * @returns {T} - 返回一个经过缓存优化的同类型字符串处理函数
 */
export const cacheStringFunction = <T extends (str: string) => string>(
  fn: T
): T => {
  /** 创建一个空对象，用于存储已处理过的字符串及其对应的处理结果 */
  const cache: Record<string, string> = Object.create(null)

  /**
   * 返回一个新函数，该函数在接收到字符串参数时，先查找缓存中是否已有处理结果，
   * 若存在则返回缓存结果；若不存在，则调用原始函数处理并将结果存入缓存后返回。
   * @param {string} str - 输入字符串
   * @returns {string} - 处理后的字符串
   */
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}
