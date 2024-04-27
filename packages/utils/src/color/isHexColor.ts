/**
 * 检查颜色是否为有效的十六进制格式
 * @function isHexColor
 * @param {string} color - 需要验证的颜色字符串
 * @returns {boolean} - 如果颜色字符串是有效的十六进制格式，返回true；否则返回false

 * @description
 * 此函数通过正则表达式检验传入的颜色字符串是否符合十六进制颜色格式要求。
 * 十六进制颜色格式可以是6位（如 "#ffffff"）或3位（如 "#fff"）的形式。

 * @example
 * ```javascript
 * import { isHexColor } from '@zkj/utils';
 * 
 * console.log(isHexColor('#ffffff')); // 输出：true
 * console.log(isHexColor('#fff')); // 输出：true
 * console.log(isHexColor('rgb(255, 255, 255)')); // 输出：false
 * ```
 */
export function isHexColor(color: string) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  return reg.test(color)
}
