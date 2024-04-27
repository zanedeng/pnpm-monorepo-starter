import { getConfig } from './getConfig'
import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 将树形结构数据转化为扁平化的列表
 * @function treeToList
 * @template T - 树形结构数据节点的数据类型
 * @param {any} tree - 树形结构数据
 * @param {Partial<TreeHelperConfig>} [config = {}] - 配置对象，用于指定子节点字段名
 * @returns {T[]} - 转换后的扁平化列表
 *
 * @description
 * 此函数接收一个树形结构数据，并将其转化为一个扁平化的一维数组。遍历树形结构的过程中，将子节点依次插入到父节点后面的适当位置。
 */
export function treeToList<T = any>(
  tree: any,
  config: Partial<TreeHelperConfig> = {},
  result: T[] = []
): T[] {
  // 获取完整的配置信息
  config = getConfig(config)

  // 获取子节点字段名
  const { children } = config

  for (const item of tree) {
    result.push(item)
    if (item[children!] && item[children!].length > 0) {
      treeToList(item[children!], config, result)
    }
  }
  // 返回扁平化后的列表
  return result
}
