import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { getCacheKey } from '@zkj/utils'
import { persistGlobalConfig } from './persist'
import type { App } from 'vue'

const store = createPinia()

store.use(createPersistedState(persistGlobalConfig(getCacheKey('pinia'))))

export function setupPinia(app: App<Element>) {
  app.use(store)
}

export { defineStore } from 'pinia'
export { store }
