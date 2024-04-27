import { isServer } from './isServer'
/**
 * 导出一个用于检测当前环境是否为客户端（浏览器）环境的布尔值常量 `isClient`。
 * 根据 `isServer` 的取值进行逻辑反转，若 `window` 全局对象已定义（即在浏览器环境中），则认定为客户端环境，返回 `true`。
 *
 * @export
 * @const
 * @name isClient
 * @type {boolean}
 *
 * @example
 * ```typescript
 * import { isClient } from '@zkj/utils';
 *
 * if (isClient) {
 *   console.log('当前运行环境为客户端（浏览器）');
 * } else {
 *   console.log('当前运行环境为服务器端');
 * }
 * ```
 */
export const isClient = !isServer
