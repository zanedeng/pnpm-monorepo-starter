import { i18n } from '/@/core'
import type { I18nGlobalTranslation } from '/@/interfaces'

/**
 * 获取根据命名空间构建的完整翻译键名
 * @param {string|undefined} namespace - 翻译键的命名空间
 * @param {string} key - 原始翻译键
 * @returns {string} - 经过处理后的完整翻译键
 */
function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

/**
 * 创建并返回一个使用了 I18n 国际化翻译功能的对象
 * @param {string|undefined} [namespace] - 可选的翻译键命名空间
 * @returns {{ t: I18nGlobalTranslation }} - 包含 `t` 方法的对象，用于翻译
 */
export const useI18n = (
  namespace?: string
): {
  t: I18nGlobalTranslation
} => {
  /**
   * 当未设置全局 i18n 或命名空间时的基础 `t` 函数实现
   * @param {string} key - 翻译键
   * @returns {string} - 返回未经翻译的原始键名或根据命名空间处理后的键名
   */
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key)
    },
  }

  // 若全局 i18n 未初始化，则直接返回基础 `t` 函数
  if (!i18n) {
    return normalFn
  }

  // 从全局 i18n 中获取 `t` 方法和其它方法集合
  const { t, ...methods } = i18n.global

  /**
   * 实现实际翻译功能的 `t` 函数
   * @param {string} key - 翻译键
   * @param {...any[]} arg - 传递给 i18n.t 的额外参数
   * @returns {string} - 经过翻译处理后的字符串
   */
  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return ''
    if (!key.includes('.') && !namespace) return key

    // @ts-ignore
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters))
  }
  // 返回的对象包含从 i18n.global 中提取的所有方法及增强版的 `t` 函数
  return {
    ...methods,
    t: tFn,
  }
}

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key
