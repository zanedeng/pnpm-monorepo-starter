import { camelize, capitalize } from './string'

/**
 * 命名空间，通常为项目或库名称。
 * @private
 * @default 'zkj'
 */
let namespace = 'zkj'

/**
 * BEM命名空间的前缀常量。
 * @constant
 * @default 'is-'
 */
const statePrefix = 'is-'

/**
 * 内部BEM风格类名生成器函数。
 * @private
 * @param {string} block - BEM中的块名。
 * @param {string} blockSuffix - 块的附加后缀。
 * @param {string} element - BEM中的元素名。
 * @param {string} modifier - BEM中的修饰符名。
 * @returns {string} - 根据BEM规则构造的CSS类名。
 */
const _bem = (
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) cls += `-${blockSuffix}`

  if (element) cls += `__${element}`

  if (modifier) cls += `--${modifier}`

  return cls
}

/**
 * 设置命名空间
 * @function
 * @param ns - 新命名空间，通常为项目或库名称。
 * @returns
 */
export const setNamespace = (ns: string) => (namespace = ns)

/**
 * 创建一个基于给定块名的命名空间对象，提供一系列用于生成BEM风格类名的方法。
 * @function
 * @param {string} block - BEM中的基础块名。
 * @returns {CreateNamespaceReturn} - 返回一个包含多种辅助方法的对象，便于生成不同组合的BEM类名以及处理CSS变量。
 */
export const createNamespace = (block: string) => {
  const n = `${capitalize(camelize(block))}`
  /**
   * 生成只包含块名和可选块后缀的基础BEM类名。
   * @function
   * @param {string} [blockSuffix=''] - 块的后缀名。
   * @returns {string} - 生成的BEM类名。
   */
  const b = (blockSuffix = '') => _bem(block, blockSuffix, '', '')

  /**
   * 生成包含块名和可选元素名的BEM类名。
   * @function
   * @param {string} [element=''] - 元素名。
   * @returns {string} - 生成的BEM类名。
   */
  const e = (element?: string) => (element ? _bem(block, '', element, '') : '')

  /**
   * 生成包含块名和可选修饰符名的BEM类名。
   * @function
   * @param {string} [modifier=''] - 修饰符名。
   * @returns {string} - 生成的BEM类名。
   */
  const m = (modifier?: string) =>
    modifier ? _bem(block, '', '', modifier) : ''

  /**
   * 生成同时包含块名、块后缀和可选元素名的BEM类名。
   * @function
   * @param {string} [blockSuffix=''] - 块的后缀名。
   * @param {string} [element=''] - 元素名。
   * @returns {string} - 生成的BEM类名。
   */
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(block, blockSuffix, element, '') : ''

  /**
   * 生成同时包含块名、可选元素名和可选修饰符名的BEM类名。
   * @function
   * @param {string} [element=''] - 元素名。
   * @param {string} [modifier=''] - 修饰符名。
   * @returns {string} - 生成的BEM类名。
   */
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(block, '', element, modifier) : ''

  /**
   * 生成同时包含块名、块后缀、可选元素名和可选修饰符名的完整BEM类名。
   * @function
   * @param {string} [blockSuffix=''] - 块的后缀名。
   * @param {string} [element=''] - 元素名。
   * @param {string} [modifier=''] - 修饰符名。
   * @returns {string} - 生成的BEM类名。
   */
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(block, blockSuffix, '', modifier) : ''

  /**
   * 生成完整的BEM类名，包括块名、块后缀、可选元素名和可选修饰符名。
   * @function
   * @param {string} [blockSuffix=''] - 块的后缀名。
   * @param {string} [element=''] - 元素名。
   * @param {string} [modifier=''] - 修饰符名。
   * @returns {string} - 生成的BEM类名。
   */
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(block, blockSuffix, element, modifier)
      : ''

  /**
   * 根据状态生成状态相关的CSS类名。
   * @function
   * @param {string} name - 状态名。
   * @param {boolean | undefined} [state=true] - 状态是否激活。
   * @returns {string} - 若状态激活，则返回以 `statePrefix` 为前缀的状态类名，否则返回空字符串。
   */
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  /**
   * 将对象中键值对转换为CSS变量样式对象。
   * @function
   * @param {Record<string, string>} object - CSS变量键值对集合。
   * @returns {Record<string, string>} - 包含CSS变量样式的对象。
   */
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object)
      if (object[key]) styles[`--${namespace}-${key}`] = object[key]

    return styles
  }

  /**
   * 将对象中键值对转换为带块名的CSS变量样式对象。
   * @function
   * @param {Record<string, string>} object - CSS变量键值对集合。
   * @returns {Record<string, string>} - 包含带块名的CSS变量样式的对象。
   */
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) styles[`--${namespace}-${block}-${key}`] = object[key]
    }
    return styles
  }

  /**
   * 根据给定的名字生成基本CSS变量名。
   * @function
   * @param {string} name - 变量名。
   * @returns {string} - 生成的CSS变量名。
   */
  const cssVarName = (name: string) => `--${namespace}-${name}`

  /**
   * 根据给定的名字生成带块名的CSS变量名。
   * @function
   * @param {string} name - 变量名。
   * @returns {string} - 生成的带块名的CSS变量名。
   */
  const cssVarBlockName = (name: string) => `--${namespace}-${block}-${name}`

  /**
   * 返回一个包含了所有上述方法的对象，用于简化BEM类名生成和CSS变量操作。
   * @returns {CreateNamespaceReturn} - 生成的命名空间对象。
   */
  return {
    namespace,
    n,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

/**
 * 表示由createNamespace函数生成的命名空间对象的类型。
 * @typedef {ReturnType<typeof createNamespace>} CreateNamespaceReturn
 */
export type CreateNamespaceReturn = ReturnType<typeof createNamespace>
