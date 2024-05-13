import { isClient, on } from '@zkj/utils'
import type { Nullable } from '@zkj/vue3types'
import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'

/**
 * @typedef {Function} DocumentHandler
 * @param {MouseEvent} mouseup - 鼠标弹起事件对象
 * @param {MouseEvent} mousedown - 鼠标按下事件对象
 * @description 定义处理鼠标弹起和按下事件的函数类型
 */
type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void

/**
 * @typedef {Map<HTMLElement, {documentHandler: DocumentHandler, bindingFn: Function}>} FlushList
 * @description 存储已注册元素及其关联的文档事件处理器和绑定函数的映射表

 */
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler
    bindingFn: (...args: unknown[]) => unknown
  }
>

/**
 * @constant {FlushList} nodeList - 存储需要检测点击外部事件的元素集合
 * @description 初始化一个空的FlushList，用于存储待处理的元素及其相关数据
 */
const nodeList: FlushList = new Map()

let startClick: Event

if (isClient) {
  on(document, 'mousedown', (e) => (startClick = e))
  on(document, 'mouseup', (e) => {
    for (const { documentHandler } of nodeList.values()) {
      documentHandler(e as MouseEvent, startClick as MouseEvent)
    }
  })
}

/**
 * @function createDocumentHandler
 * @param {HTMLElement} el - 指令作用的目标元素
 * @param {DirectiveBinding} binding - Vue指令绑定对象，包含指令的值、参数等信息
 * @returns {DocumentHandler} 处理鼠标弹起和按下的事件处理器
 * @description 根据给定元素和指令参数创建一个事件处理器，用于判断鼠标事件是否发生在目标元素外部
 */
const createDocumentHandler = (
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler => {
  let excludes: HTMLElement[] = []
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg
  } else {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg as unknown as HTMLElement)
  }
  return (mouseup, mousedown) => {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: Nullable<HTMLElement>
      }>
    ).popperRef
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown.target as Node
    const isBound = !binding || !binding.instance
    const isTargetExists = !mouseUpTarget || !mouseDownTarget
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    const isTargetExcluded =
      (excludes.length &&
        excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return
    }
    binding.value()
  }
}

/**
 * 实现了一个Vue指令，用于在点击元素外部时触发回调函数。
 * 当用户在指定元素外部单击鼠标时，将会执行绑定的值（即回调函数）。
 *
 * @typedef {Object} clickOutside
 * @property {Function} beforeMount - 在元素挂载前添加事件处理器
 * @property {Function} updated - 在元素更新时更新事件处理器
 * @property {Function} unmounted - 在元素卸载时移除事件处理器
 * @description 定义Vue指令对象，提供生命周期钩子函数来管理元素的事件监听
 *
 * @example
 * ```javascript
 * import { clickOutside } from './clickOutside';
 * app.directive('click-outside', clickOutside);
 * ```
 */
const clickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
  },
  unmounted(el) {
    nodeList.delete(el)
  },
}

export { clickOutside }
