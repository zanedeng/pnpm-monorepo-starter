/**
 * @typedef {('zh_CN'|'en')} LocaleType
 * @description 定义了应用支持的本地化语言类型枚举，目前包括简体中文（'zh_CN'）和英文（'en'）两种语言环境。
 *
 * @example
 * ```typescript
 * import { LocaleType } from '@zkj/vue3locale';
 *
 * // 使用 LocaleType 类型
 * const currentLocale: LocaleType = 'zh_CN'; // 当前语言环境为简体中文
 * const supportedLocales: LocaleType[] = ['zh_CN', 'en']; // 应用支持的语言环境列表
 * ```
 *
 * 此类型定义可用于类型检查，确保在处理本地化相关的变量和参数时，它们的值只能是预定义的语言环境类型之一。
 */
export type LocaleType =
  | 'zh_CN' // 简体中文（中国大陆）
  | 'zh-TW' // 繁体中文（中国台湾）
  | 'en' // 英语
  | 'en-US' // 英语（美国）
  | 'en-GB' // 英语（英国）
  | 'fr-FR' // 法语（法国）
  | 'de-DE' // 德语（德国）
  | 'ja-JP' // 日语（日本）
  | 'es-ES' // 西班牙语（西班牙）
