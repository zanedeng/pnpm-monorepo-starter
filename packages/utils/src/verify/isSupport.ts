/**
 * 用于检测给定回调函数 `callback` 执行结果是否为 truthy 值（即非假值，如 `false`、`0`、`''`、`null`、`undefined` 和 `NaN`），
 * 间接判断某个特性或功能是否在当前环境得到支持。
 *
 * @function isSupport
 * @param {() => unknown} callback - 回调函数，用于检测某种特性或功能的支持情况。该函数无参数且返回一个任意类型的结果，但最终会被转换为布尔值进行判断。
 * @returns {boolean} - 如果 `callback` 执行结果为 truthy 值，则返回 `true`，表示当前环境支持该特性或功能；否则返回 `false`，表示不支持。
 *
 * @example
 * ```typescript
 * // 假设有个API可以检测浏览器是否支持Web Workers
 * const supportsWebWorkers = () => ('Worker' in window);
 *
 * const isWebWorkersSupported = isSupport(supportsWebWorkers);
 *
 * if (isWebWorkersSupported) {
 *   console.log('当前环境支持Web Workers');
 * } else {
 *   console.log('当前环境不支持Web Workers');
 * }
 * ```
 */
export const isSupport = (callback: () => unknown) => {
  const isSupported = Boolean(callback())

  return isSupported
}
