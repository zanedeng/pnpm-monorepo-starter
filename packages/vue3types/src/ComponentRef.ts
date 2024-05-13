import type { ComponentElRef } from './ComponentElRef'

/**
 * 定义 ComponentRef 泛型类型
 * @typedef {ComponentElRef<T> | null} ComponentRef<T>
 * @template T 限制组件引用指向的DOM元素类型，默认为HTMLDivElement
 * @description ComponentRef 类型用于描述一个 Vue.js 组件实例的引用，它可以是 ComponentElRef 类型，即包含一个指向组件挂载的原生 DOM 元素引用 `$el` 的对象，也可以是 `null`，表示尚未获取到有效的组件引用。
 * 这种类型主要用于处理在某些情况下（如异步加载组件或条件渲染后）组件实例可能未挂载到 DOM 中的情况。
 *
 * 示例：
 * ```typescript
 * interface MyComponent extends Vue {
 *   componentRef: ComponentRef<HTMLDivElement>;
 * }
 *
 * const myComponent: MyComponent = new Vue({
 *   // ...
 *   mounted() {
 *     if (this.componentRef) {
 *       // 当 componentRef 不为空时，可以安全地访问和操作对应的 DOM 元素
 *       this.componentRef.$el.style.backgroundColor = 'blue';
 *     } else {
 *       console.log('Component reference not available yet.');
 *     }
 *   },
 *   methods: {
 *     loadComponent() {
 *       // 异步加载组件后，将引用赋值给 componentRef
 *       this.componentRef = this.$refs.asyncComponent as ComponentRef<HTMLDivElement>;
 *     }
 *   },
 * });
 * ```
 */
export type ComponentRef<T extends HTMLElement = HTMLDivElement> =
  ComponentElRef<T> | null
