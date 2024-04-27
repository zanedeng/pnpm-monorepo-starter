/**
 * @function pickTextColorBasedOnBgColor
 * @description 根据背景颜色自动选取合适的前景文本颜色，确保文本在不同背景色上的可读性。
 * @param {string} bgColor - 背景颜色值，格式为十六进制字符串，例如 "#ffffff" 或 "ffffff"。
 * @param {string} lightColor - 当背景较浅时使用的前景文本颜色。
 * @param {string} darkColor - 当背景较深时使用的前景文本颜色。
 * @returns {string} - 根据背景颜色计算得到的合适的前景文本颜色。
 *
 * 函数内部首先将传入的背景颜色值转换为RGB分量，然后计算这些分量在标准色彩空间下的亮度系数。
 * 根据亮度系数判断背景属于明色系还是暗色系，从而确定使用lightColor或darkColor作为前景文本颜色。
 */
export function pickTextColorBasedOnBgColor(
  bgColor: string,
  lightColor: string,
  darkColor: string
) {
  // 首先处理传入的背景色值，确保提取有效的十六进制颜色值
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor

  // 将RGB各分量从十六进制字符串转换为十进制数值
  const r = parseInt(color.substring(0, 2), 16) // hexToR
  const g = parseInt(color.substring(2, 4), 16) // hexToG
  const b = parseInt(color.substring(4, 6), 16) // hexToB

  // 计算对应RGB值在标准色彩空间下的亮度系数
  const uicolors = [r / 255, g / 255, b / 255]
  const c = uicolors.map((col) => {
    // 对于较小的颜色分量，直接使用sRGB到Luminance的转换公式
    if (col <= 0.03928) {
      return col / 12.92
    }
    // 对于较大的颜色分量，使用sRGB非线性变换到Luminance的转换公式
    // return Math.pow((colorComponent + 0.055) / 1.055, 2.4);
    return ((col + 0.055) / 1.055) ** 2.4
  })

  // 计算背景颜色的亮度（Luminance），按照ITU-R BT.709标准
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  // 根据亮度判断文本颜色，当背景亮度低于阈值时选用深色文本，反之则选用浅色文本以保证对比度和可读性
  return L < 0.8 ? darkColor : lightColor
}
