import { getConfig } from './getConfig'
import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 寻找树形结构中满足特定条件的路径
 * @function findPath
 * @template T - 节点的数据类型，默认为 any
 * @param {any} tree - 树形结构数据
 * @param {Function} func - 判断节点是否满足条件的回调函数，接受一个节点作为参数，返回一个布尔值
 * @param {Partial<TreeHelperConfig>} [config = {}] - 树形助手的配置信息，默认为空对象
 * @returns {(T | T[] | null)} - 返回满足条件的节点及其路径，路径按顺序排列，若找不到满足条件的节点，则返回 null
 *
 * @description
 * 该函数首先获取并合并用户的自定义配置信息，然后采用广度优先搜索遍历传入的树形结构数据。
 * 对于每个访问的节点，首先检查是否已访问过，若已访问，则回溯到上一节点。
 * 若节点未被访问过，则将其标记为已访问，并将子节点添加到待遍历队列的头部。
 * 在遍历过程中，将节点添加到路径数组中。
 * 若节点满足条件，则返回当前的路径数组。
 * 遍历结束后仍未找到满足条件的节点，则返回 null。
 */
export function findPath<T = any>(
  tree: any,
  func: Function,
  config: Partial<TreeHelperConfig> = {}
): T | T[] | null {
  // 获取并合并配置信息
  config = getConfig(config)

  // 初始化路径数组
  const path: T[] = []

  // 将根节点列表转为可迭代的数组
  const list = [...tree]

  // 创建一个集合记录已访问过的节点
  const visitedSet = new Set()

  // 获取配置中指定的子节点字段名
  const { children } = config

  // 广度优先搜索遍历树形结构
  while (list.length) {
    const node = list[0]

    // 如果节点已访问过，则回溯到上一层节点
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      // 标记当前节点为已访问
      visitedSet.add(node)

      // 添加子节点到待遍历队列的头部
      node[children!] && list.unshift(...node[children!])

      // 将当前节点添加到路径中
      path.push(node)
      // 检查当前节点是否满足条件
      if (func(node)) {
        // 若满足条件，返回当前的路径数组
        return path
      }
    }
  }
  return null
}
