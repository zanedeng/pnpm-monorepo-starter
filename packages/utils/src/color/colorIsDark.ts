import { hexToRGB } from './hexToRGB'
import { isHexColor } from './isHexColor'

/**
 * 判断颜色是否偏暗
 * @function colorIsDark
 * @param {string} color - 需要判断的颜色值，可以是十六进制颜色字符串
 * @returns {boolean} - 如果颜色偏暗则返回 true，否则返回 false

 * @description
 * 此函数首先验证输入的颜色值是否为有效的十六进制颜色格式。如果是，则将其转换为 RGB 格式。
 * 然后根据 YIQ 色彩模型中亮度系数计算该颜色的亮度，其中 R、G、B 分别乘以系数 0.299、0.578、0.114 并求和。
 * 如果计算得出的亮度值小于192，则认为该颜色偏暗，返回 true；反之则返回 false。

 * @requires {function} hexToRGB - 将十六进制颜色转换为 RGB 格式的函数
 * @requires {function} isHexColor - 判断颜色是否为有效十六进制颜色格式的函数

 * @example
 * ```javascript
 * import { colorIsDark } from '@zkj/utils';
 * 
 * const darkColor = '#333333';
 * const lightColor = '#CCCCCC';
 * 
 * console.log(colorIsDark(darkColor)); // 输出：true
 * console.log(colorIsDark(lightColor)); // 输出：false
 * ```
 */
export function colorIsDark(color: string) {
  if (!isHexColor(color)) return
  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item))
  return r * 0.299 + g * 0.578 + b * 0.114 < 192
}
