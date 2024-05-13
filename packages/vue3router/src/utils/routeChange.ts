import { mitt } from '@zkj/utils'
import { getRawRoute } from './getRawRoute'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * 定义一个符号常量作为事件的唯一标识
 */
const key = Symbol()

/**
 * 创建一个 Mitt 实例，用于发布和订阅路由变化事件
 * 事件数据类型为 RouteLocationNormalized
 */
const emitter = mitt<{
  [key]: RouteLocationNormalized
}>()

/**
 * 定义存储最后一次改变的 Tab 路由变量
 */
let lastChangeTab: RouteLocationNormalized

/**
 * 设置当前路由变化事件的方法
 * 发布一个新的路由变更事件，同时更新 lastChangeTab
 * @param lastChangeRoute - 最新的路由变化信息
 */
export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

/**
 * 添加一个监听路由变化的回调函数
 * @param callback - 路由变化时执行的回调函数，参数为变更后的路由信息
 * @param immediate - 是否立即执行一次回调函数，默认为 true，即立即执行
 */
export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  // 注册监听路由变化的回调函数
  emitter.on(key, callback)
  // 如果 immediate 为真且 lastChangeTab 已经有值，则立即执行回调函数
  immediate && lastChangeTab && callback(lastChangeTab)
}

/**
 * 移除所有 Tab 路由变化监听器
 * 清除已注册的所有事件监听器
 */
export function removeTabChangeListener() {
  // 使用 Mitt 的 clear 方法清空所有事件监听器
  emitter.clear()
}
