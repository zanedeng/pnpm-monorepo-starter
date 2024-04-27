/**
 * 判断给定字符串是否符合帕斯卡命名法（PascalCase）规则。
 * 帕斯卡命名法规定：字符串的第一个字符必须是大写字母，其余字符可以是大写字母、小写字母或下划线。
 * 示例：MyVariableName，ClassName，APIRequest。
 *
 * @param str - 需要判断的字符串
 * @returns 如果字符串符合帕斯卡命名法，则返回true，否则返回false
 */
export function isPascalCase(str: string): boolean {
  // 创建一个正则表达式，用于匹配首字母大写、后续字符可以是任意字母的大写字母或小写字母的字符串
  const regex = /^[A-Z][A-Za-z]*$/

  // 使用正则表达式测试字符串是否匹配
  return regex.test(str)
}
