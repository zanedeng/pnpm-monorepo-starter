import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'

// 导出全局Vue Router实例
export let router: Router

/**
 * 定义RouterProps接口，用于初始化Vue Router时所需的配置项
 */
export interface RouterProps {
  /**
   * @property path - 字符串类型，表示应用的基础路径（路由基准路径）。
   */
  path: string
  /**
   * @property routes - RouteRecordRaw数组类型，包含项目的所有路由记录原始数据结构，用于构建路由表。
   */
  routes: RouteRecordRaw[]
  /**
   * @property whiteNameList - 字符串数组类型，存储白名单中的路由名称列表，可能用于权限控制或其他特殊逻辑处理。
   */
  whiteNameList: string[]
}

// 定义一个全局变量whiteNameList，用于存储白名单路由名称
let whiteNameList: string[]

/**
 * 初始化并返回Vue Router实例
 * @function initRouter
 * @param {string} options.path - 应用程序的基础路由路径，默认值为 '/'。
 * @param {RouteRecordRaw[]} options.routes - 应用程序的路由配置集合，若不传入，则默认为空数组。
 * @param {string[]} [options.whiteNameList] - 可选参数，初始化时传入的白名单路由名称列表，默认为空数组。
 * @returns {Router} - 初始化完成的Vue Router实例
 */
export function initRouter(options: Partial<RouterProps>): Router {
  whiteNameList = options.whiteNameList || []
  // 创建Vue Router实例
  router = createRouter({
    // 使用createWebHashHistory创建历史管理模式
    history: createWebHashHistory(options.path || '/'),
    // 配置基础路由
    routes: options.routes || [],
    // 开启严格模式，禁止未在路由表中定义的路径访问
    strict: true,
    // 设置滚动行为策略，页面跳转后滚到顶部
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })
  return router
}

/**
 * @function resetRouter
 * @description 重新设置路由器，遍历现有的路由表并移除不在白名单（whiteNameList）中的路由。
 *
 * @example
 * ```typescript
 * // 调用 resetRouter 函数，清除那些不在 whiteNameList 中的路由
 * resetRouter();
 * ```
 *
 * @details
 * 此函数会遍历当前已注册的全部路由，对于每一个路由记录，获取其 `name` 属性。
 * 如果路由名称存在，并且不在 `whiteNameList` 白名单内，则判断该路由是否已注册，
 * 如果已注册，则调用 `router.removeRoute` 方法移除该路由。
 *
 * @param {void}
 * @returns {void}
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !whiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export * from '/@/utils'
export * from '/@/types'
export * from 'vue-router'
