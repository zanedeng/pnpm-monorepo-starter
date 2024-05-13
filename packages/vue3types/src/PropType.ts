import type { PropType as VuePropType } from 'vue'

/**
 * 它用于在 Props 注解中明确指定 Prop 的类型，
 * 从而在 TypeScript 中获得更好的类型推断和错误检查能力。
 *
 * @alias PropType
 * @typedef {VuePropType<T>} PropType<T>
 * @description
 * 在当前作用域中，我们为 VuePropType 创建了一个同义词 `PropType`，
 * 这样在编写 Vue 组件 Props 类型注解时，可以直接使用 `PropType<T>` 来代替 `VuePropType<T>`，
 * 提高代码的易读性和一致性。
 */
export type PropType<T> = VuePropType<T>
