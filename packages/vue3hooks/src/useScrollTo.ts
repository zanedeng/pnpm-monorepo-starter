import { ref, unref } from 'vue'
import { isFunction, isUndefined } from '@zkj/utils'

/**
 * @typedef {Object} ScrollToParams
 * @property {HTMLElement | Window | any} el - 需要滚动的元素或可滚动区域
 * @property {number} to - 目标滚动位置（像素值）
 * @property {number=} [duration=500] - 滚动动画的持续时间，默认为500毫秒
 * @property {() => any=} [callback] - 动画完成后的回调函数
 */
export interface ScrollToParams {
  el: any
  to: number
  duration?: number
  callback?: () => any
}

/**
 * @function easeInOutQuad
 * @param {number} t - 当前时间（相对于动画总时长的比例）
 * @param {number} b - 起始值
 * @param {number} c - 变化量
 * @param {number} d - 动画总时长
 * @returns {number} - 根据缓动算法计算出的当前帧的目标值
 * @description 计算基于缓动函数 `easeInOutQuad` 的平滑过渡数值
 */
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

/**
 * @function move
 * @param {HTMLElement} el - 需要更改滚动位置的元素
 * @param {number} amount - 要滚动到的位置
 * @description 设置元素的滚动位置为给定的数值
 */
const move = (el: HTMLElement, amount: number) => {
  el.scrollTop = amount
}

/**
 * @function position
 * @param {HTMLElement} el - 获取滚动位置的元素
 * @returns {number} - 元素当前的滚动位置
 * @description 获取元素的滚动高度（scrollTop）值
 */
const position = (el: HTMLElement) => {
  return el.scrollTop
}

/**
 * 用于处理元素的平滑滚动动画至指定位置，并提供了开始和停止滚动的方法。
 * @function useScrollTo
 * @param {ScrollToParams} params - 包含滚动相关参数的对象
 * @returns {{start: Function, stop: Function}} - 启动和停止滚动动画的方法集合
 * @description 创建并返回一组滚动动画控制方法
 * @memberof module:scroll-utils
 */
export function useScrollTo({
  el,
  to,
  duration = 500,
  callback,
}: ScrollToParams) {
  /**
   * @type {import('vue').Ref<boolean>} isActiveRef
   * @description 响应式变量，表示滚动动画是否正在进行
   */
  const isActiveRef = ref(false)
  const start = position(el)
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = isUndefined(duration) ? 500 : duration

  /**
   * @function animateScroll
   * @private
   * @description 实现滚动动画的核心递归函数，通过 requestAnimationFrame 更新滚动位置
   */
  const animateScroll = function () {
    if (!unref(isActiveRef)) {
      return
    }
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(el, val)
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll)
    } else {
      if (callback && isFunction(callback)) {
        callback()
      }
    }
  }

  /**
   * @function run
   * @description 开始滚动动画
   */
  const run = () => {
    isActiveRef.value = true
    animateScroll()
  }

  /**
   * @function stop
   * @description 停止滚动动画
   */
  const stop = () => {
    isActiveRef.value = false
  }

  return { start: run, stop }
}
