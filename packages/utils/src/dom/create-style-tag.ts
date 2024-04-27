import { defaultDocument } from '../configurable'
import type { ConfigurableDocument } from '../configurable'

/**
 * 定义创建样式标签的选项接口
 * @interface CreateStyleTagOptions
 * @extends ConfigurableDocument
 * @property {boolean} [immediate=true] - 是否立即加载样式
 * @property {string} [id] - 样式标签的 DOM ID，默认为自动递增ID
 */
export interface CreateStyleTagOptions extends ConfigurableDocument {
  immediate?: boolean
  id?: string
}

/**
 * 定义 createStyleTag 函数返回的对象结构
 * @interface CreateStyleTagReturn
 * @property {string} id - 样式标签的唯一ID
 * @property {string} css - 样式内容
 * @property {Readonly<boolean>} isLoaded - 样式是否已加载
 * @property {() => void} load - 加载样式的方法
 * @property {() => void} unload - 卸载样式的方法
 */
export interface CreateStyleTagReturn {
  id: string
  css: string
  isLoaded: Readonly<boolean>
  load: () => void
  unload: () => void
}

/**
 * 初始化全局ID计数器
 * @constant _id
 * @type {number}
 * @default 0
 */
let _id = 0

/**
 * 向文档<head>中注入<style>元素
 * @function createStyleTag
 * @param {string} css - 样式内容
 * @param {CreateStyleTagOptions} [options=defaultOptions] - 创建样式标签的选项
 * @returns {CreateStyleTagReturn} - 返回一个包含样式加载和卸载控制方法的对象

 * @example
 * ```javascript
 * import { createStyleTag } from './createStyleTag';
 * 
 * const styleContent = `
 *   .custom-style {
 *     color: red;
 *   }
 * `;
 * 
 * const styleOptions = {
 *   immediate: false,
 * };
 * 
 * const style = createStyleTag(styleContent, styleOptions);
 * 
 * // 在需要的时候加载样式
 * style.load();
 * 
 * // 在需要的时候卸载样式
 * style.unload();
 * ```
 */
export function createStyleTag(
  css: string,
  options: CreateStyleTagOptions = {}
): CreateStyleTagReturn {
  // 初始化加载状态标志
  let isLoaded = false

  // 解构并获取选项参数
  const {
    immediate = true,
    id = `zkj_${++_id}`,
    document = defaultDocument,
  } = options

  // 加载样式的方法
  const load = () => {
    if (!document) return

    // 获取或创建一个新的style元素
    const el = (document.getElementById(id) ||
      document.createElement('style')) as HTMLStyleElement
    el.type = 'text/css'
    el.id = id
    el.innerText = css
    document.head.appendChild(el)
    el.onload = () => {
      isLoaded = true
    }
  }

  // 卸载样式的方法
  const unload = () => {
    if (!document || !isLoaded) return

    document.head.removeChild(document.getElementById(id) as HTMLStyleElement)
    isLoaded = false
  }

  // 如果设置了立即加载，则立即调用加载方法
  if (immediate) load()

  // 返回包含样式信息和加载/卸载方法的对象
  return {
    id,
    css,
    isLoaded,
    load,
    unload,
  }
}
