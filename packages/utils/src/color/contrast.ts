import { luminanace } from './luminanace'

/**
 * 计算两种颜色间的对比度
 * @function contrast
 * @param {string[]} rgb1 - 第一种颜色的RGB值数组，每个元素都是字符串形式且表示0-255的整数值
 * @param {number[]} rgb2 - 第二种颜色的RGB值数组，每个元素都是0-255的整数值
 * @returns {number} - 返回两种颜色之间的对比度值，范围大约在1到21之间

 * @description
 * 此函数首先将传入的RGB值字符串数组转换为整数数组，然后调用`luminance`函数计算每种颜色的亮度。
 * 之后，根据WCAG 2.0标准，通过两者的亮度比例计算出对比度值。
 * 对比度值越高，说明两种颜色之间的差异越大，可视性越好。

 * @example
 * ```javascript
 * const color1 = ['255', '255', '255']; // 白色
 * const color2 = [0, 0, 0]; // 黑色
 * const contrastRatio = contrast(color1, color2);
 * console.log(contrastRatio); // 输出：1
 * ```
 *
 * @see luminanace - 用于计算颜色亮度的辅助函数
 */
export function contrast(rgb1: string[], rgb2: number[]) {
  return (
    (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05) /
    (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  )
}
