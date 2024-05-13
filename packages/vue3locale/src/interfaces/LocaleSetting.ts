import type { LocaleType } from '/@/types/LocaleType'

/**
 * @interface LocaleSetting
 * @description 定义了一个本地化配置接口，用于管理应用程序支持的语言环境及其相关设置。
 *
 * @property {LocaleType} locale - 当前语言环境，代表应用程序当前使用的语言。
 * @property {LocaleType} fallback - 默认语言环境，当无法找到匹配的语言包时，系统将回退至该语言环境。
 * @property {LocaleType[]} availableLocales - 可用的语言环境列表，表示应用程序支持的所有语言种类数组。
 *
 * 示例：
 * ```typescript
 * const localeSetting: LocaleSetting = {
 *   locale: 'en-US',
 *   fallback: 'en-US',
 *   availableLocales: ['en-US', 'zh-CN', 'es-ES'],
 * };
 * ```
 */
export interface LocaleSetting {
  showPicker: boolean
  // 当前使用的语言环境
  locale: LocaleType
  // 默认语言环境
  fallback: LocaleType
  // 支持的所有可用语言环境列表
  availableLocales: LocaleType[]
}
