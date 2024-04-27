import { getConfig } from './getConfig'
import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 对树形结构数据进行深度优先遍历，并对每个节点执行回调函数
 * @function treeForEach
 * @template T - 树形结构数据节点的数据类型
 * @param {T[]} tree - 树形结构数据
 * @param {(n: T) => any} func - 回调函数，接受一个节点作为参数，若返回值为真，则停止遍历
 * @param {Partial<TreeHelperConfig>} [config = {}] - 配置对象，用于指定子节点字段名
 * @returns {void}
 *
 * @description
 * 该函数会对传入的树形结构数据进行深度优先遍历，对每个节点调用回调函数。如果回调函数返回值为真，则停止遍历。遍历时，会动态调整遍历顺序，保证子节点在父节点之后被访问。
 */
export function treeForEach<T extends Record<string, any>>(
  tree: T[],
  func: (n: T) => any,
  config: Partial<TreeHelperConfig> = {}
): void {
  // 获取配置信息
  config = getConfig(config)

  // 获取子节点字段名
  const { children } = config

  function dfs(nodeList: T[]): void {
    nodeList.forEach((node) => {
      // 对当前节点执行回调函数，若返回值为真，则提前结束遍历
      if (func(node)) {
        return
      }

      // 如果当前节点包含子节点，递归遍历子节点
      if (children && node[children]) {
        dfs(node[children])
      }
    })
  }

  dfs(tree)
}
