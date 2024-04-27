/**
 * 函数 subtractLight 从给定的十六进制颜色值中减去指定数量的亮度（模拟暗化效果）
 * @function subtractLight
 * @param {string} color - 十六进制颜色字符串，例如 "#RRGGBB"
 * @param {number} amount - 需要减少的亮度值（此值通常需要映射到合适的色彩空间调整范围内，这里假设它直接对应于整体颜色的亮度）
 * @returns {string} - 新的十六进制颜色字符串

 * @description
 * 此函数首先将输入的颜色字符串转换为十进制整数，然后尝试从这个整数值中减去给定的 `amount`。
 * 如果减法操作导致结果小于0，则将其设置为0（因为颜色值不能为负数）。
 * 最后，确保输出的颜色字符串始终具有完整的6位（对于RGB每通道两位），如果不足则在前面补0。

 * 注意：这个函数对颜色的“亮度”减法处理非常简单，实际上并不符合真实色彩学中的亮度调整逻辑，
 * 在实际应用中可能需要将颜色转换到 HSL 或 HSV 颜色空间来单独调整亮度或饱和度。

 * @example
 * ```javascript
 * import { subtractLight } from '@zkj/utils';
 * 
 * const darkerColor = subtractLight("#FF0000", 50);
 * console.log(darkerColor); // 输出可能是类似 "#EE0000" 的暗红色
 * ```
 */
export function subtractLight(color: string, amount: number) {
  const cc = parseInt(color, 16) - amount
  const c = cc < 0 ? 0 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
