import type { ComputedRef, Ref } from 'vue'

/**
 * DynamicProps<T> 的结构是一个对象，其 key 为 T 的 keys（即 T 的属性名），value 为三种可能的类型之一：
 * 1. Ref<T[P]>：表示该属性是一个响应式的引用，其值类型为 T 的对应属性类型。
 * 2. T[P]：表示该属性可以直接是 T 的原始属性类型。
 * 3. ComputedRef<T[P]>：表示该属性是一个计算属性引用，其值类型也为 T 的对应属性类型。
 *
 * 这种设计允许组件接收的 props 可以是原始值，也可以是响应式引用（Ref）或计算属性（ComputedRef），
 * 为 Vue3 中组件间通信提供了更灵活的方式。
 */
export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
