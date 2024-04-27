import { treeMapEach } from './treeMapEach'

/**
 * @description: 该函数用于提取树形结构中的指定部分，通过遍历树形数据并对每个节点应用转化函数
 * @function treeMap
 * @template T - 树形结构数据节点的数据类型
 * @param {T[]} treeData - 树形结构数据数组
 * @param {Object} opt - 配置对象，包含如下属性：
 * - `children?`: 可选，指定子节点字段名，默认使用树结构助手配置中的 `children`
 * - `conversion`: 必需，提供一个转化函数，用于对树形结构中的每个节点进行转化处理
 * @returns {T[]} - 经过转化处理后的树形结构数据数组
 */
export function treeMap<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Function }
): T[] {
  return treeData.map((item) => treeMapEach(item, opt))
}
