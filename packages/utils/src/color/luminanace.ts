/**
 * 计算颜色的亮度
 * @function luminanace
 * @param {number} r - 颜色的红色通道值，取值范围为0-255
 * @param {number} g - 颜色的绿色通道值，取值范围为0-255
 * @param {number} b - 颜色的蓝色通道值，取值范围为0-255
 * @returns {number} - 返回颜色的亮度值，范围通常介于0（全黑）到1（全白）

 * @description
 * 此函数依据 WCAG 2.0 规范中定义的相对亮度算法，将给定的 RGB 值转换为其相应的亮度值。
 * 它首先将 RGB 值归一化到0-1范围内，然后对每个通道值应用不同的权重进行计算，最后返回亮度值。

 * @example
 * ```javascript
 * import { luminanace } from '@zkj/utils';
 * 
 * const redLuminance = luminanace(255, 0, 0); // 计算纯红色的亮度
 * console.log(redLuminance); // 输出：0.2126
 * ```
 */
export function luminanace(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    // 将RGB值归一化并应用gamma校正
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  // 根据归一化和校正后的值计算亮度
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}
