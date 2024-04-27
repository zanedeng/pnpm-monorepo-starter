/**
 * 遍历并转化树形结构中的每个节点及其子节点
 * @function treeMapEach
 * @param {any} data - 当前处理的树形结构节点
 * @param {{children?: string; conversion: Function}} options - 处理选项
 *   - children: 可选参数，默认值为 `'children'`，表示当前节点下的子节点字段名
 *   - conversion: 必须参数，提供一个转化函数，用于对每个节点进行处理
 * @returns {any} - 经转化处理后的节点数据，保持原有树形结构
 *
 * @description
 * 此函数会遍历给定的树形结构数据，对每个节点应用指定的 `conversion` 函数进行转化，并递归处理其子节点。
 * 如果节点包含子节点（即 `data[children]` 是一个非空数组），则递归调用 `treeMapEach` 函数处理所有子节点，
 * 并将处理后的子节点数据合并到转化后的当前节点数据中。
 * 如果节点没有子节点，则仅返回转化后的当前节点数据。
 */
export function treeMapEach(
  data: any,
  {
    children = 'children',
    conversion,
  }: { children?: string; conversion: Function }
) {
  // 判断当前节点是否有子节点
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0

  // 将当前节点数据应用转化函数
  const conversionData = conversion(data) || {}

  // 若当前节点有子节点，则递归处理子节点
  if (haveChildren) {
    return {
      ...conversionData,
      // 使用映射函数处理子节点，并将结果赋值给新的子节点数组
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion,
        })
      ),
    }
  } else {
    return {
      ...conversionData,
    }
  }
}
