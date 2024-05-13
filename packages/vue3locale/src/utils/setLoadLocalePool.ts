import type { LocaleType } from '/@/types'

/**
 * @constant loadLocalePool
 * @description 存储应用支持的语言环境集合，初始为空数组。
 * @type {LocaleType[]}
 */
export const loadLocalePool: LocaleType[] = []

/**
 * @function setLoadLocalePool
 * @description 通过传入的回调函数设置或更新语言环境加载池。
 * @param {Function} cb - 回调函数，接收当前的语言环境加载池数组作为参数，可以通过此函数对加载池进行增删改操作。
 *
 * @example
 * ```typescript
 * import { loadLocalePool, setLoadLocalePool } from '@zkj/vue3locale';
 *
 * // 添加一组支持的语言环境到加载池
 * setLoadLocalePool((pool) => {
 *   pool.push('zh-CN');
 *   pool.push('en-US');
 * });
 *
 * // 访问当前加载的语言环境集合
 * console.log(loadLocalePool);
 * ```
 */
export const setLoadLocalePool = (
  cb: (loadLocalePool: LocaleType[]) => void
) => {
  cb(loadLocalePool)
}
