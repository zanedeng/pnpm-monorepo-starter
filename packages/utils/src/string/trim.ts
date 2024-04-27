/**
 * 移除字符串两端空白字符的函数
 * @function trim
 * @param {string} str - 需要进行两端空白字符移除操作的字符串
 * @returns {string} - 返回去除两端空白字符后的字符串
 *
 * @description
 * 此函数会去除传入字符串两端的空白字符，包括但不限于空格、制表符、换行符以及Unicode空白符（如BOM字符\uFEFF）。
 *
 * @example
 * ```typescript
 * // 假设我们有一个带有前后空白字符的字符串
 * const inputString = '\t \n Hello, World! \n \t';
 *
 * // 调用trim函数进行处理
 * const trimmedString = trim(inputString);
 *
 * // 输出结果将是 "Hello, World!"
 * console.log(trimmedString); // 输出: "Hello, World!"
 * ```
 */
export function trim(str: string) {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
