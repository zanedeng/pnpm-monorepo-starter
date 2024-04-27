import { contrast } from './contrast'
import { hexToRGB } from './hexToRGB'

/**
 * 计算最佳文本颜色
 * @function calculateBestTextColor
 * @param {string} hexColor - 输入的十六进制颜色值，不含'#'前缀
 * @returns {string} - 最适合搭配给定背景色的文本颜色，返回值为黑色("#000000")或白色("#FFFFFF")

 * @description
 * 此函数首先将输入的十六进制颜色值转换为RGB格式，然后基于对比度算法（contrast函数）计算该背景色与黑色文本的对比度。
 * 若对比度大于等于12，则认为黑色文本在该背景色下具有足够的可读性，返回黑色作为最佳文本颜色；
 * 否则，返回白色作为最佳文本颜色，以确保文本在背景色下的可读性。

 * @requires {function} contrast - 计算两种颜色间对比度的函数
 * @requires {function} hexToRGB - 将十六进制颜色转换为RGB格式的函数
 * 
 * @example
 * ```javascript
 * import { calculateBestTextColor } from './colorUtils';
 * 
 * const bgColorHex = 'ffcc00'; // 柠檬黄背景色
 * const bestTextColor = calculateBestTextColor(bgColorHex);
 * console.log(bestTextColor); // 输出最优文本颜色（可能是'#000000'或'#FFFFFF'）
 * ```
 */
export function calculateBestTextColor(hexColor: string) {
  const rgbColor = hexToRGB(hexColor.substring(1))
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0])

  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF'
}
