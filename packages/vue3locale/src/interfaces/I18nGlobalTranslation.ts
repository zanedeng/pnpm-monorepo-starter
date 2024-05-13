/**
 * @interface I18nGlobalTranslation
 * @description I18n 全局翻译接口，提供了多种重载形式的 `t` 函数，用于根据不同参数类型执行国际化翻译。
 *
 * @param {string} key - 翻译键，即待翻译的文本资源标识符。
 * @param {string} [locale] - 可选参数，指定特定的语言环境进行翻译，若不提供，则默认使用当前的语言环境。
 * @param {unknown[]} [list] - 当翻译内容包含占位符并且需要传入一个数组时，此参数用于填充占位符。
 * @param {Record<string, unknown>} [named] - 当翻译内容包含命名占位符时，此参数为一个对象，键为占位符名称，值为占位符的填充内容。
 *
 * 下面列举了 `I18nGlobalTranslation` 接口中 `t` 函数的几种典型调用方式：
 *
 * - 单纯根据 `key` 进行翻译：`t(key: string): string`
 * - 指定语言环境进行翻译：`t(key: string, locale: string): string`
 * - 根据 `key` 和数组参数进行翻译，适用于列表占位符：`t(key: string, list: unknown[]): string`
 * - 指定语言环境并根据 `key` 和数组参数进行翻译：`t(key: string, locale: string, list: unknown[]): string`
 * - 根据 `key` 和命名参数对象进行翻译，适用于命名占位符：`t(key: string, named: Record<string, unknown>): string`
 * - 指定语言环境并根据 `key` 和命名参数对象进行翻译：`t(key: string, locale: string, named: Record<string, unknown>): string`
 *
 * 这些重载使得 `t` 函数具有高度灵活性，可以根据具体的翻译需求选用不同的参数组合。
 */
export interface I18nGlobalTranslation {
  (key: string): string
  (key: string, locale: string): string
  (key: string, locale: string, list: unknown[]): string
  (key: string, locale: string, named: Record<string, unknown>): string
  (key: string, list: unknown[]): string
  (key: string, named: Record<string, unknown>): string
}
