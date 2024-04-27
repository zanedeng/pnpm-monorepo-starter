/**
 * @function joinTimestamp
 * @description 根据给定的布尔值`join`和`restful`参数生成不同的时间戳表示。若`restful`为布尔类型泛型`T`，
 * 当`T`被推断为`true`时，返回一个带有时间戳的查询字符串；否则，返回一个包含时间戳的对象。
 *
 * @param {boolean} join - 是否要添加时间戳
 * @param {T} restful - 决定返回结果的形式，默认为`false`。当`restful`为`true`时，返回查询字符串形式的时间戳。
 *
 * @returns {(T extends true ? string : object)} - 如果`restful`为`true`，返回以"?_t="开头的时间戳字符串；否则，返回包含"time"字段的对象。
 *
 * @example <caption>示例</caption>
 * ```typescript
 * joinTimestamp(true, true); // 返回类似 "?_t=1234567890"
 * joinTimestamp(true, false); // 返回类似 { _t: 1234567890 }
 * ```
 */
export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    // 如果不需添加时间戳，则根据restful参数返回空字符串或空对象
    return restful ? '' : {}
  }
  // 获取当前时间戳
  const now = new Date().getTime()
  // 根据restful参数决定返回值形式
  if (restful) {
    // 返回查询字符串形式的时间戳
    return `?_t=${now}`
  }
  // 返回包含时间戳的对象
  return { _t: now }
}
