/**
 * 该接口用于描述处理树形数据结构时所需的属性名称配置。
 * - `id`: 表示每个节点自身的唯一标识字段名。
 * - `children`: 表示每个节点所包含的子节点数组字段名。
 * - `pid`: 表示每个节点对应的父节点ID字段名。
 *
 * 这些字段常用于组织和操作树形数据，如构建、遍历、筛选、转换等操作。
 */

/**
 * 定义树形结构助手配置接口
 * @interface TreeHelperConfig
 */
export interface TreeHelperConfig {
  /**
   * 节点ID字段名
   * @property {string} id
   */
  id: string
  /**
   * 子节点字段名
   * @property {string} children
   */
  children: string
  /**
   * 父节点ID字段名
   * @property {string} pid
   */
  pid: string
}
