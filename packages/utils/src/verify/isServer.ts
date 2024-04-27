/**
 * 导出一个用于检测当前环境是否为服务器端环境的布尔值常量 `isServer`。
 * 如果 `window` 全局对象未定义（即在非浏览器环境中，如Node.js服务器端），则认定为服务器端环境，返回 `true`。
 *
 * @export
 * @const
 * @name isServer
 * @type {boolean}
 *
 * @example
 * ```typescript
 * import { isServer } from '@zkj/utils';
 *
 * if (isServer) {
 *   console.log('当前运行环境为服务器端');
 * } else {
 *   console.log('当前运行环境为客户端（浏览器）');
 * }
 * ```
 */
export const isServer = typeof window === 'undefined'
