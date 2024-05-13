import type { LocaleType } from '../types'

/**
 * @function setHtmlPageLang
 * @description 设置HTML文档语言属性的函数，将整个页面的语言环境更改为指定的`locale`值。
 * @param {LocaleType} locale - 需要设置的语言环境标识符，例如 `'zh_CN'` 或 `'en'`。
 *
 * @example
 * ```typescript
 * import { LOCALE, setHtmlPageLang } from '@zkj/vue3locale';
 *
 * // 将页面语言设置为简体中文
 * setHtmlPageLang(LOCALE.zh);
 * ```
 *
 * 此函数通过修改HTML根元素（`<html>`标签）上的`lang`属性来更新页面的语言环境。
 * 这样有助于浏览器正确渲染各种语言特性的内容，比如正确的日期、数字格式，以及利于SEO优化。
 */
export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}
