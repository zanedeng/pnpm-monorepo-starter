import { addLight } from './addLight'

/**
 * 提亮颜色
 * @function lighten
 * @param {string} color - 需要提亮的颜色值，格式为十六进制字符串，例如 "#000000"
 * @param {number} amount - 提亮的程度，取值范围通常为0到100之间的小数，表示百分比
 * @returns {string} - 提亮后的颜色值，格式依然是十六进制字符串

 * @description
 * 此函数首先处理输入的颜色值，确保它以十六进制形式表示（去掉 "#" 符号，如果有的话）。
 * 然后，根据提供的百分比 `amount` 计算需要增加的亮度值。
 * 最后，对颜色的红、绿、蓝三个通道分别应用 `addLight` 函数，以增加它们的亮度值，并重新拼接成一个新的十六进制颜色字符串。

 * @example
 * ```javascript
 * import { lighten } from '@zkj/utils';
 * 
 * const originalColor = '#000000'; // 黑色
 * const lighterColor = lighten(originalColor, 50); // 提亮50%
 * console.log(lighterColor); // 输出提亮后的黑色十六进制颜色值
 * ```
 * 
 * @see addLight - 增加颜色亮度的辅助函数
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}
