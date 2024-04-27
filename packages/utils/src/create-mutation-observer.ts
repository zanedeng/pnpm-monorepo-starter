import { defaultWindow } from './configurable'
import { isSupport } from './verify'
import type { ConfigurableWindow } from './configurable'

/**
 * 定义UseMutationObserverOptions接口，扩展自MutationObserverInit接口和ConfigurableWindow接口
 * @interface UseMutationObserverOptions
 * @extends MutationObserverInit
 * @extends ConfigurableWindow
 */
export interface UseMutationObserverOptions
  extends MutationObserverInit,
    ConfigurableWindow {}

/**
 * 监听DOM树的变化。
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN官方文档
 * @param {HTMLElement} target - 要观察的DOM元素
 * @param {MutationCallback} callback - 当DOM变化发生时执行的回调函数
 * @param {UseMutationObserverOptions} [options={}] - 观察器选项，包括自定义窗口对象及MutationObserver所需的初始化配置
 * @returns {UseMutationObserverReturn} - 包含isSupported属性（指示MutationObserver是否支持）、start方法（启动观察）和stop方法（停止观察）的对象
 */
export function useMutationObserver(
  target: HTMLElement,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {}
) {
  // 解构赋值，获取options中的window属性（若未提供则使用defaultWindow），并分离出MutationObserver需要的配置项
  const { window = defaultWindow, ...mutationOptions } = options
  // 定义MutationObserver实例
  let observer: MutationObserver | undefined
  // 检查当前环境是否支持MutationObserver
  const isSupported = isSupport(() => window && 'MutationObserver' in window)

  // 启动观察的方法
  const start = () => {
    if (isSupported && window && target) {
      observer = new MutationObserver(callback)
      observer!.observe(target, mutationOptions)
    }
  }

  // 停止观察的方法
  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }
  // 返回包含isSupported状态以及启动和停止观察方法的对象
  return {
    isSupported,
    start,
    stop,
  }
}

/**
 * 定义UseMutationObserverReturn类型别名，表示useMutationObserver函数的返回类型
 * @typedef {ReturnType<typeof useMutationObserver>} UseMutationObserverReturn
 */
export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>
