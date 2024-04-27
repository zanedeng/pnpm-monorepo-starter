import type { TreeHelperConfig } from './TreeHelperConfig'

/**
 * 定义默认的树形结构处理配置
 * @constant
 * @type {TreeHelperConfig}
 */
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

/**
 * 获取合并后的配置信息
 * @function getConfig
 * @param {Partial<TreeHelperConfig>} [config] - 用户提供的部分或全部配置信息
 * @returns {TreeHelperConfig} - 合并后的完整配置信息，包含用户自定义配置及默认配置
 *
 * @description
 * 该函数利用 `Object.assign` 方法将用户提供的部分配置信息与默认配置信息合并，
 * 返回一个新的配置对象，以便在处理树形结构时使用统一且完整的配置信息。
 */
export const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config)
