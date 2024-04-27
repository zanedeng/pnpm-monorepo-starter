import { subtractLight } from './subtractLight'

/**
 * 减淡颜色
 * @function darken
 * @param {string} color - 需要变暗的颜色值，格式为十六进制字符串，例如 "#FF0000"
 * @param {number} amount - 变暗的程度，取值范围通常为0到100之间的小数，表示百分比
 * @returns {string} - 变暗后的颜色值，格式依然为十六进制字符串

 * @description
 * 此函数首先处理输入的颜色值，确保它以十六进制形式表示（去掉 "#" 符号，如果有的话）。
 * 然后，根据提供的百分比 `amount` 计算需要减少的亮度值。
 * 最后，对颜色的红、绿、蓝三个通道分别应用 `subtractLight` 函数，以降低它们的亮度值，并重新拼接成一个新的十六进制颜色字符串。

 * @example
 * ```javascript
 * import { darken } from '@zkj/utils';
 * 
 * const originalColor = '#FF0000'; // 红色
 * const darkerColor = darken(originalColor, 50); // 变暗50%
 * console.log(darkerColor); // 输出变暗后的红色十六进制颜色值
 * ```
 * 
 * @see subtractLight - 减少颜色亮度的辅助函数
 */
export function darken(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount
  )}${subtractLight(color.substring(4, 6), amount)}`
}
