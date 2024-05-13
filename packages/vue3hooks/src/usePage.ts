import { unref } from 'vue'
import { useRouter } from 'vue-router'
import { isHttpUrl, openWindow } from '@zkj/utils'

import type { RouteLocationRaw, Router } from 'vue-router'

/**
 * @function handleError - 错误处理函数，将错误信息输出到控制台
 * @param {Error} e - 错误对象
 */
function handleError(e: Error) {
  console.error(e)
}

export enum GoType {
  'replace',
  'after',
}

/**
 * 创建并返回导航方法
 * @function useGo
 * @param {Router} [_router] - 可选的路由实例，若不传入则自动调用useRouter获取
 * @returns {Function} go - 导航方法，接受目标路由参数与是否替换当前历史记录选项
 */
export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter()

  function go(opt?: RouteLocationRaw): void
  function go(opt: RouteLocationRaw, isReplace: boolean): void
  function go(opt: RouteLocationRaw, goType: GoType): void
  function go(
    opt: RouteLocationRaw = '/',
    goTypeOrIsReplace: boolean | GoType = false
  ) {
    if (!opt) {
      return
    }
    let path = unref(opt) as string
    if (path[0] === '/') {
      path = path.slice(1)
    }
    if (isHttpUrl(path)) {
      return openWindow(path)
    }

    const isReplace =
      goTypeOrIsReplace === true || goTypeOrIsReplace === GoType.replace

    if (isReplace) {
      replace(opt).catch(handleError)
    } else {
      push(opt).catch(handleError)
    }
  }
  return go
}

/**
 * 创建并返回重做导航方法
 * @function useRedo
 * @param {Router} [_router] - 可选的路由实例，若不传入则自动调用useRouter获取
 * @returns {Function} redo - 重做导航方法，将当前页面信息作为参数重定向至REDIRECT_NAME指定页面
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  /**
   * 执行重做导航
   * @function redo
   * @returns {Promise<boolean>} - 返回一个表示重做成功与否的Promise
   */
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === 'Redirect') {
        resolve(false)
        return
      }
      // 根据当前路由信息构建重定向参数
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      push({ name: 'Redirect', params, query }).then(() => resolve(true))
    })
  }
  return redo
}
