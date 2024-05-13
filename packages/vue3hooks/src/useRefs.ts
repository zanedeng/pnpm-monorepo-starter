import { onBeforeUpdate, shallowRef } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'

/**
 * @function useRefs
 * @description 用于收集并存储元素引用，并提供设置元素引用的方法
 * @returns {[Ref<HTMLElement[]>, (index: number) => (el: HTMLElement) => void]}
 *   - 返回一个数组，第一个元素是一个存储HTMLElement集合的响应式引用
 *   - 第二个元素是一个函数，接收一个索引和一个HTML元素作为参数，将其添加到引用集合对应的位置

 * @body
 * 使用此Hook时，每次组件渲染前都会清空refs集合（在onBeforeUpdate生命周期钩子中实现），
 * 并提供setRefs方法用于在渲染过程中设置元素引用，确保在组件更新时始终保持最新的元素引用集合。
 */
export function useRefs<T = HTMLElement>(): {
  refs: Ref<T[]>
  setRefs: (
    index: number
  ) => (el: Element | ComponentPublicInstance | null) => void
} {
  const refs = shallowRef([]) as Ref<T[]>

  onBeforeUpdate(() => {
    refs.value = []
  })

  const setRefs =
    (index: number) => (el: Element | ComponentPublicInstance | null) => {
      refs.value[index] = el as T
    }

  return {
    refs,
    setRefs,
  }
}
