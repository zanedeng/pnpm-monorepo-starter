import { set } from '@zkj/vue3hooks'
import type { Recordable } from '@zkj/vue3types'

/**
 * 负责将多语言文件结构扁平化并整合成单一的对象结构，以便于 vue-i18n 使用。
 *
 * @function genMessage
 * @param {Record<string, Record<string, any>>} langs - 多语言文件的对象集合，通常由动态导入的语言包构成，键为文件路径，值为文件导出的对象。
 * @param {string} [prefix='lang'] - 语言文件路径的前缀，默认为'lang'。
 * @returns {Recordable<any>} 返回一个扁平化后的多语言消息对象，键为模块名与内部键连接而成的字符串，值为对应的翻译内容。
 */
export const genMessage = (
  langs: Record<string, Record<string, any>>,
  prefix = 'lang'
) => {
  // 初始化一个空对象来存储扁平化的语言消息
  const obj: Recordable<any> = {}

  // 遍历所有语言文件对象
  Object.keys(langs).forEach((key) => {
    // 获取语言文件的具体内容
    const langFileModule = langs[key].default
    // 去除语言文件路径中的前缀和相对路径符号
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')

    // 截取文件名（不含扩展名）
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)

    // 分割文件名以获得目录层级结构
    const keyList = fileName.split('/')

    // 获取模块名
    const moduleName = keyList.shift()

    // 如果存在子层级，则通过剩余的目录结构生成内部键
    const objKey = keyList.join('.')

    // 如果模块名存在
    if (moduleName) {
      // 若有内部键
      if (objKey) {
        // 在目标对象上创建或更新指定模块下的内部键路径
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        // 如果没有内部键，则直接在目标对象上创建或更新模块名
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  // 返回构建好的扁平化语言消息对象
  return obj
}
