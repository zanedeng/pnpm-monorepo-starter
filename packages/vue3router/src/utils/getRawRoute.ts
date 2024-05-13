import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

/**
 * 获取未经转换的原始路由对象
 * 此函数接收一个经过 Vue Router 解析过的路由对象（RouteLocationNormalized）
 * 并返回一个精简版的、只包含必要信息的路由对象
 * @param route - 已解析的路由对象
 * @returns {RouteLocationNormalized} - 精简版的原始路由对象
 */
export function getRawRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  // 如果输入的路由对象为空，则直接返回
  if (!route) return route

  // 从原始路由对象中提取所需信息
  const { matched, ...opt } = route

  // 将 matched 数组转换为 RouteRecordNormalized 形式的数组
  // 返回精简版的原始路由对象，包含 opt 属性和转换后的 matched 数组
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}
