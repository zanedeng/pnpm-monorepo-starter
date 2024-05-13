import { createI18n } from 'vue-i18n'
import { deepMerge, getCacheValue } from '@zkj/utils'
import { LOCALE_KEY } from '../constants'
import { setHtmlPageLang, setLoadLocalePool } from '../utils'
import { useLocaleStoreWithOut } from '../store'
import type { LocaleSetting } from '../interfaces'
import type { LocaleType } from '../types'
import type { LangModule } from '../interfaces/LangModule'
import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'

/**
 * 全局 i18n 实例
 * @global
 * @type {ReturnType<typeof createI18n>}
 */
export let i18n: ReturnType<typeof createI18n>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export let getLangModule = async (_: LocaleType): Promise<LangModule> => ({
  message: {},
})
/**
 * @function createI18nOptions
 * @description 异步生成 vue-i18n 所需的初始化选项
 * @returns {I18nOptions} 返回一个包含初始化配置的 Promise 对象
 * @async
 */
const createI18nOptions = async (): Promise<I18nOptions> => {
  const localeStore = useLocaleStoreWithOut()
  // 获取当前应用的语言环境
  const locale = localeStore.getLocale
  const defaultLocal = (await getLangModule(locale)) as LangModule
  console.log(defaultLocal)
  const message = defaultLocal?.message ?? {}
  // 设置 HTML 页面的语言属性
  setHtmlPageLang(locale)
  // 将当前语言环境添加到语言环境加载池
  setLoadLocalePool((loadLocalePool) => loadLocalePool.push(locale))
  // 返回 vue-i18n 初始化选项
  return {
    // 使用新 API 模式而非遗留模式
    legacy: false,
    // 当前语言环境
    locale,
    // 默认语言环境
    fallbackLocale: localeStore.getFallback,
    // 翻译消息对象，键为语言环境，值为对应语言的消息
    messages: {
      [locale]: message,
    },
    // 可用语言环境列表
    availableLocales: localeStore.getAvailableLocales,
    // 同步模式，确保在组件间切换时语言立即生效
    sync: true,
    // 静默处理未找到翻译警告
    silentTranslationWarn: true,
    // 关闭丢失翻译资源警告
    missingWarn: false,
    // 静默处理回退到默认语言环境警告
    silentFallbackWarn: true,
  }
}

/**
 * 初始化 i18n 的参数配置
 */
export type SetupI18nConfig = {
  app: App
  localeSetting?: LocaleSetting
  getLangModule?: (locale: LocaleType) => Promise<LangModule>
}

/**
 * 初始化 i18n
 * @function setupI18n
 * @param {App} config - 初始化配置信息
 * @async
 */
export const setupI18n = async (config: SetupI18nConfig) => {
  if (config.getLangModule) {
    getLangModule = config.getLangModule
  }

  const localeStore = useLocaleStoreWithOut()
  let localeCfg: LocaleSetting = getCacheValue(LOCALE_KEY) as LocaleSetting
  localeCfg = deepMerge(config.localeSetting, localeCfg || {})
  localeStore.setLocaleInfo(localeCfg)

  const options = await createI18nOptions()
  i18n = createI18n(options)
  // 将 i18n 实例挂载到 Vue 应用上
  config.app.use(i18n)
}
