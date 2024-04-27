import axios from 'axios'
import { isFunction } from '@zkj/utils'
import { getPendingUrl } from '../../utils/getPendingUrl'
import type { AxiosRequestConfig, Canceler } from 'axios'

// 创建一个用于存储待取消请求及其取消函数的映射表
let pendingMap = new Map<string, Canceler>()

/**
 * @class AxiosCanceler
 * @description
 * 提供了一种机制，可以管理和取消正在等待中的 Axios HTTP 请求。
 * 它通过维护一个 pendingMap 映射表，将每个请求的 URL 与对应的取消函数（Canceler）关联起来。
 * 当需要添加、移除或取消请求时，它会相应地更新映射表，并在需要时调用取消函数来终止特定的 HTTP 请求。
 * 同时提供了 reset 方法用于清除所有的待处理请求记录。
 */
export class AxiosCanceler {
  /**
   * @method addPending
   * @description 添加一个待取消的 Axios 请求至映射表，并为请求分配一个新的 CancelToken。
   * 若同一 URL 已存在待取消请求，则先移除旧的 CancelToken。
   * @param {AxiosRequestConfig} config - 需要添加至待取消队列的 Axios 请求配置对象。
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @method removeAllPending
   * @description 取消并移除映射表中所有待取消的 Axios 请求。
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * @method removePending
   * @description 移除并取消指定 Axios 请求的 CancelToken。
   * @param {AxiosRequestConfig} config - 需要从待取消队列移除的 Axios 请求配置对象。
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @method reset
   * @description 重置映射表，清空所有待取消请求记录。
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
