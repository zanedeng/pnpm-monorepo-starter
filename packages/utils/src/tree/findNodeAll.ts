import { getConfig } from './getConfig'
import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 寻找树形结构中所有满足特定条件的节点
 * @function findNodeAll
 * @template T - 节点的数据类型，默认为 any
 * @param {any} tree - 树形结构数据
 * @param {Function} func - 判断节点是否满足条件的回调函数，接受一个节点作为参数，返回一个布尔值
 * @param {Partial<TreeHelperConfig>} [config = {}] - 树形助手的配置信息，默认为空对象
 * @returns {T[]} - 返回一个包含所有满足条件的节点数据的数组
 *
 * @description
 * 该函数首先获取并合并用户的自定义配置信息，然后遍历传入的树形结构数据。
 * 对于每个节点，首先调用 `func` 函数检查节点是否满足特定条件。
 * 如果满足条件，则将该节点添加至结果数组。
 * 不论节点是否满足条件，都会继续检查节点的子节点列表（根据配置信息中的 `children` 键名获取）并将子节点加入待遍历列表。
 * 遍历结束后，返回包含所有满足条件的节点的数据数组。
 */
export function findNodeAll<T = any>(
  tree: any,
  func: Function,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  // 获取并合并配置信息
  config = getConfig(config)

  // 获取配置中指定的子节点字段名
  const { children } = config

  // 将根节点列表转为可迭代的数组
  const list = [...tree]

  // 初始化存储满足条件的节点结果数组
  const result: T[] = []

  // 遍历整个树形结构，包括各级子节点
  for (const node of list) {
    // 检查当前节点是否满足条件，若满足则将其添加到结果数组中
    if (func(node)) {
      result.push(node)
    }
    // 若当前节点包含子节点列表，并且子节点列表非空
    if (node[children!] && Array.isArray(node[children!])) {
      // 将子节点追加到待遍历列表中
      list.push(...node[children!])
    }
  }
  // 遍历完成后，返回包含所有满足条件节点的数据数组
  return result
}
