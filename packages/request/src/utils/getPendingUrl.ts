import type { AxiosRequestConfig } from 'axios'

/**
 * @function getPendingUrl
 * @description 该函数用于生成一个表示正在进行中的 Axios 请求的唯一标识字符串，该标识基于请求方法和 URL。
 * 这个标识可用于跟踪或管理多个并发请求，尤其是需要取消某个请求时。
 *
 * @param {AxiosRequestConfig} config - Axios 请求配置对象，包含了请求方法和请求 URL。
 * @returns {string} - 返回一个由请求方法和 URL 通过 '&' 符号连接而成的字符串，作为请求标识。
 *
 * 示例：
 * ```typescript
 * const axiosConfig: AxiosRequestConfig = {
 *   method: 'GET',
 *   url: '/api/data',
 *   params: { id: 1 },
 * };
 * const pendingUrl = getPendingUrl(axiosConfig); // 输出类似 "GET&/api/data"
 * ```
 */
export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&')
