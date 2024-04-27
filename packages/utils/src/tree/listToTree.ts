import { getConfig } from './getConfig'
import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 将扁平化的节点列表转换成树形结构
 * @template T - 节点数据类型
 * @param {any[]} list - 包含所有节点数据的扁平化数组
 * @param {Partial<TreeHelperConfig>} [config={}] - 配置对象，用于指定节点ID字段、子节点字段和父节点字段
 * @returns {T[]} - 转换后形成的树形结构数组
 */
export function listToTree<T = any>(
  list: any[],
  config: Partial<TreeHelperConfig> = {}
): T[] {
  // 获取合并后的完整配置信息
  const conf = getConfig(config) as TreeHelperConfig

  // 创建一个Map来存储每个节点，键为节点ID，值为节点对象
  const nodeMap = new Map()

  // 初始化结果数组
  const result: T[] = []

  // 提取配置中的关键字段名
  const { id, children, pid } = conf

  // 遍历输入列表，初始化每个节点的子节点属性，并将节点存入Map中
  for (const node of list) {
    // 若节点没有子节点数组，则赋予空数组
    node[children] = node[children] || []
    // 将节点ID与其关联的节点对象放入Map中
    nodeMap.set(node[id], node)
  }

  // 遍历输入列表，根据每个节点的父节点ID将其附加到相应父节点的子节点数组中
  for (const node of list) {
    // 获取当前节点的父节点对象
    const parent = nodeMap.get(node[pid])
    // 如果存在父节点，则将当前节点添加至父节点的子节点数组；否则直接添加至结果数组作为根节点
    ;(parent ? parent[children] : result).push(node)
  }
  return result
}
