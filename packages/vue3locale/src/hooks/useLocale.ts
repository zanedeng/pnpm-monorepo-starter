import { ref, unref } from 'vue'
import { getCacheValue, setCacheValue } from '@zkj/utils'
import { LOCALE_KEY } from '/@/constants'
import { getLangModule, i18n } from '/@/core/setupI18n'
import { loadLocalePool, setHtmlPageLang } from '/@/utils'
import type { LangModule } from '/@/interfaces'
import type { LocaleType } from '/@/types'

const cacheLocaleInfo = getCacheValue(LOCALE_KEY) || {}

const getLocale = ref<LocaleType>(cacheLocaleInfo.locale)

function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  getLocale.value = locale
  setCacheValue(LOCALE_KEY, {
    locale,
  })
  setHtmlPageLang(locale)
}

export const useLocale = () => {
  const changeLocale = async (locale: LocaleType) => {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)

    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    const langModule = (await getLangModule(locale)) as LangModule
    console.log(langModule)
    if (!langModule) {
      return
    }

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    changeLocale,
    getLocale,
  }
}
