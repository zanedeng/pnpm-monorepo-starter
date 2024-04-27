/**
 * 将RGB颜色转换为十六进制颜色
 * @function rgbToHex
 * @param {number} r - 红色通道的十进制值，范围是0-255
 * @param {number} g - 绿色通道的十进制值，范围是0-255
 * @param {number} b - 蓝色通道的十进制值，范围是0-255
 * @returns {string} - 返回格式为 "#RRGGBB" 的十六进制颜色字符串

 * @description
 * 此函数接受三个代表RGB通道的十进制数字，并将它们转换为一个等效的十六进制颜色字符串。
 * 首先将RGB值进行位运算合并为一个整数，然后将该整数转换为十六进制表示，并在其前方补充必要的0以确保长度为6位。

 * @example
 * ```javascript
 * import { rgbToHex } from '@zkj/utils';
 * 
 * const hexColor = rgbToHex(255, 200, 100);
 * console.log(hexColor); // 输出："#FFC864"
 * ```
 */
export function rgbToHex(r: number, g: number, b: number) {
  // 使用位运算将RGB值组合成一个整数
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  // 补充前导0以确保总共有6位十六进制数
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`
}
