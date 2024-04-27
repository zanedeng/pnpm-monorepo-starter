import { getConfig } from './getConfig'
import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 根据回调函数过滤树形结构数据
 * @function treeFilter
 * @template T - 树形结构数据节点的数据类型
 * @param {T[]} tree - 树形结构数据
 * @param {(n: T) => boolean} func - 过滤函数，接受一个节点作为参数并返回一个布尔值，表示是否保留该节点
 * @param {Partial<TreeHelperConfig>} [config = {}] - 配置对象，用于指定子节点字段名
 * @returns {T[]} - 过滤后的树形结构数据
 *
 * @description
 * 该函数递归遍历树形结构数据，并通过回调函数 `func` 进行节点筛选。对于每个节点，如果回调函数返回 `true` 或者节点拥有非空子节点列表，则该节点会被保留在结果集中。
 */
export function treeFilter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  // 获取配置
  config = getConfig(config)
  // 获取子节点字段名
  const children = config.children as string
  // 定义内部递归函数，用于过滤节点列表
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node })) // 创建节点副本以避免修改原数据
      .filter((node) => {
        // 递归调用 对含有children项  进行再次调用自身函数 listFilter
        node[children] = node[children] && listFilter(node[children])
        // 执行传入的回调 func 进行过滤
        return func(node) || (node[children] && node[children].length)
      })
  }
  // 应用内部递归函数处理整个树形结构数据
  return listFilter(tree)
}
