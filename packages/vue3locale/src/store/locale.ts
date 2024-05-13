import { getCacheValue, setCacheValue } from '@zkj/utils'
import { defineStore, store } from '@zkj/vue3store'
import { LOCALE_KEY } from '../constants'
import type { LocaleSetting } from '../interfaces'
import type { LocaleType } from '../types'

const lsLocaleSetting = (getCacheValue(LOCALE_KEY) || {}) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(state): boolean {
      return !!state.localInfo?.showPicker
    },
    getLocale(state): LocaleType {
      return state.localInfo?.locale
    },
    getFallback(state): LocaleType {
      return state.localInfo?.fallback
    },
    getAvailableLocales(state): LocaleType[] {
      return state.localInfo?.availableLocales
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      setCacheValue(LOCALE_KEY, this.localInfo)
    },
  },
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
