/**
 * 增加颜色亮度
 * @function addLight
 * @param {string} color - 需要调整亮度的颜色值，格式为十六进制字符串（例如 "#FF0000"）
 * @param {number} amount - 增加的亮度值，取值范围理论上不受限制，但实际效果受255色阶上限约束
 * @returns {string} - 调整亮度后的颜色值，仍为十六进制字符串形式

 * @description
 * 此函数接受一个十六进制表示的颜色字符串和一个亮度增量值，根据增量值增加颜色的亮度，并返回新的十六进制颜色字符串。
 * 若增加后的颜色值超过255，则会被限制在255以内。
 * 若最终计算得到的颜色值为一位数，则在前面补零，以保持正常的十六进制颜色字符串格式。

 * @example
 * ```javascript
 * const originalColor = '#000000'; // 黑色
 * const lighterColor = addLight(originalColor, 100); // 增加100亮度单位
 * console.log(lighterColor); // 输出可能为 "#7f7f7f"
 * ```
 */
export function addLight(color: string, amount: number): string {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
