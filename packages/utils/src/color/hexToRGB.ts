import { isHexColor } from './isHexColor'

/**
 * 十六进制颜色转RGB格式
 * @function hexToRGB
 * @param {string} hex - 输入的十六进制颜色值，可以包含前导的 '#' 符号
 * @returns {string} - 输出颜色的RGB格式字符串，如 "RGB(255, 255, 255)"，若输入无效则返回原输入字符串

 * @description
 * 此函数将一个十六进制颜色字符串转换为RGB格式字符串。如果输入的是简写的三位十六进制颜色码（如 #fff），则会先将其扩展为六位。然后根据十六进制颜色值计算出对应的RGB值并组成RGB格式字符串。

 * @example
 * ```javascript
 * import { hexToRGB } from '@zkj/utils';
 * 
 * const hexColor = '#00FFFF';
 * const rgbColor = hexToRGB(hexColor);
 * console.log(rgbColor); // 输出："RGB(0, 255, 255)"
 * ```
 */
export function hexToRGB(hex: string) {
  let sHex = hex.toLowerCase()
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      }
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sHex.slice(i, i + 2)}`))
    }
    return `RGB(${sColorChange.join(',')})`
  }
  return sHex
}
