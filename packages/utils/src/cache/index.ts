import { isNil } from 'lodash-es'
import {
  type Encryption,
  EncryptionFactory,
  type EncryptionParams,
} from '../cipher'

export interface CacheConfig extends EncryptionParams {
  prefixKey: string
  version: string
  hasEncrypt: boolean
  timeout?: number | null
}

let cacheConfig: CacheConfig = {
  prefixKey: `zkj`,
  version: '0.0.1',
  hasEncrypt: false,
  timeout: null,
  key: '_11111000001111@',
  iv: '@11111000001111_',
}

let persistEncryption: Encryption = EncryptionFactory.createAesEncryption({
  key: cacheConfig.key!,
  iv: cacheConfig.iv!,
})

/**
 * 设置缓存配置
 */
export const setCacheConfig = (config: Partial<CacheConfig> = {}) => {
  if (config.hasEncrypt) {
    if (
      [cacheConfig.key?.length, cacheConfig.iv?.length].some(
        (item) => item !== 16
      )
    ) {
      throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
    }

    if (config.key !== cacheConfig.key || config.iv !== cacheConfig.iv) {
      persistEncryption = EncryptionFactory.createAesEncryption({
        key: config.key!,
        iv: config.iv!,
      })
    }
  }

  cacheConfig = {
    ...cacheConfig,
    ...config,
  }
}

/**
 * @function setCacheKeyPrefix
 * @param {string} prefix - 新的缓存键前缀
 * @returns {void}
 * @summary 设置全局缓存键前缀
 * @description 设置所有后续生成的缓存键使用的前缀字符串
 */
export const setCacheKeyPrefix = (str: string) => (cacheConfig.prefixKey = str)

/**
 * @function getCacheKeyPrefix
 * @returns {string} 当前设置的缓存键前缀
 * @summary 获取全局缓存键前缀
 * @description 返回当前已经设置的缓存键前缀字符串
 */
export const getCacheKeyPrefix = () => cacheConfig.prefixKey

/**
 * @function setCacheVersion
 * @param {string} version - 新的缓存版本号
 * @returns {void}
 * @summary 设置全局缓存版本号
 * @description 更新缓存版本号以便在数据结构或策略更改时刷新缓存
 */
export const setCacheVersion = (str: string) => (cacheConfig.version = str)

/**
 * @function getCacheVersion
 * @returns {string} 当前设置的缓存版本号
 * @summary 获取全局缓存版本号
 * @description 返回当前已经设置的缓存版本号字符串
 */
export const getCacheVersion = () => cacheConfig.version

/**
 * @function getCacheKey
 * @param {string} key - 基础缓存键名
 * @returns {string} 组合后的完整缓存键
 * @summary 创建包含前缀、版本号和基础键名的唯一缓存键
 * @description 将基础键名与全局缓存键前缀和版本号合并，形成一个大写的完整缓存键，用于缓存操作
 */
export const getCacheKey = (key: string) =>
  `_${cacheConfig.prefixKey}_${cacheConfig.version}_${key}_`.toUpperCase()

/**
 * 设置缓存数据
 * @param {string} key - 缓存键名
 * @param {any} value - 需要存储的数据
 * @param {'local' | 'session'} type - 存储介质的类型，默认值为 'local'
 * @param {number|null} [expire=null] - 缓存过期时间（单位：秒），默认不过期
 */
export const setCacheValue = (
  key: string,
  value: any,
  type: 'local' | 'session' = 'local',
  expire: number | null = null
) => {
  const stringData = JSON.stringify({
    value,
    time: Date.now(),
    expire: !isNil(expire) ? new Date().getTime() + expire * 1000 : null,
  })
  // 根据hasEncrypt属性决定是否对数据进行加密
  const stringifyValue = cacheConfig.hasEncrypt
    ? persistEncryption.encrypt(stringData)
    : stringData

  const storage = type === 'local' ? localStorage : sessionStorage
  // 将处理后的数据存储到storage中
  storage.setItem(getCacheKey(key), stringifyValue)
}

/**
 * 获取缓存数据
 * @param {string} key - 缓存键名
 * @param {any} [def=null] - 当缓存不存在或已过期时返回的默认值
 * @returns {any} - 缓存中的数据或默认值
 */
export const getCacheValue = (key: string, def: any = null): any => {
  const cacheKey = getCacheKey(key)
  let val = localStorage.getItem(cacheKey)
  let type: 'local' | 'session' = 'local'
  // 如果在 localStorage 中没有找到值，则去 sessionStorage 找
  if (!val) {
    val = sessionStorage.getItem(cacheKey)
    type = 'session'
  }
  // 如果还是没有找到对应的缓存值，则直接返回默认值
  if (!val) return def

  try {
    // 解密数据（如果启用了加密）
    const decVal = cacheConfig.hasEncrypt ? persistEncryption.decrypt(val) : val

    // 反序列化JSON字符串并检查缓存是否过期
    const data = JSON.parse(decVal)
    const { value, expire } = data
    if (isNil(expire) || expire >= new Date().getTime()) {
      return value
    }
    // 若缓存已过期，则删除该缓存项
    removeCacheByKey(key, type)
  } catch (e) {
    // 解析或解密失败时，返回默认值
    return def
  }
}

/**
 * 删除指定键名的缓存数据
 * @param {string} key - 缓存键名
 */
export const removeCacheByKey = (
  key: string,
  type: 'local' | 'session' = 'local'
) => {
  const storage = type === 'local' ? localStorage : sessionStorage
  storage.removeItem(getCacheKey(key))
}

/**
 * 清除所有缓存数据
 */
export const clearCache = (type: 'local' | 'session' = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage
  storage.clear()
}
