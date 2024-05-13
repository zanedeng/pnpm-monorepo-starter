/**
 * @enum ScreenSizeEnum
 * @description 设备屏幕尺寸枚举类型
 *
 * - XS: 'XS' - 特别小屏幕设备
 * - SM: 'SM' - 小型屏幕设备
 * - MD: 'MD' - 中型屏幕设备
 * - LG: 'LG' - 大型屏幕设备
 * - XL: 'XL' - 特大型屏幕设备
 * - XXL: 'XXL' - 超大屏幕设备
 */
export enum ScreenSizeEnum {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL',
}

/**
 * @enum ScreenValueEnum
 * @description 设备屏幕尺寸对应的最小宽度像素值枚举类型
 *
 * - XS: 480  - 特别小屏幕设备的最小宽度像素
 * - SM: 576  - 小型屏幕设备的最小宽度像素
 * - MD: 768  - 中型屏幕设备的最小宽度像素
 * - LG: 992  - 大型屏幕设备的最小宽度像素
 * - XL: 1200 - 特大型屏幕设备的最小宽度像素
 * - XXL: 1600 - 超大屏幕设备的最小宽度像素
 */
export enum ScreenValueEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

/**
 * @constant screenMap
 * @description 创建一个映射关系，键为`ScreenSizeEnum`枚举成员，值为对应屏幕尺寸的最小宽度像素值（`ScreenValueEnum`枚举成员）。
 *
 * 例如：
 * ```typescript
 * screenMap.get(ScreenSizeEnum.XS) // 返回 480
 * ```
 */
const screenMap = new Map<ScreenSizeEnum, number>()

// 初始化屏幕尺寸与像素值映射表
screenMap.set(ScreenSizeEnum.XS, ScreenValueEnum.XS)
screenMap.set(ScreenSizeEnum.SM, ScreenValueEnum.SM)
screenMap.set(ScreenSizeEnum.MD, ScreenValueEnum.MD)
screenMap.set(ScreenSizeEnum.LG, ScreenValueEnum.LG)
screenMap.set(ScreenSizeEnum.XL, ScreenValueEnum.XL)
screenMap.set(ScreenSizeEnum.XXL, ScreenValueEnum.XXL)

export { screenMap }
