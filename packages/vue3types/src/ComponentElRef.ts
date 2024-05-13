/**
 * 定义 ComponentElRef 泛型接口
 * @interface ComponentElRef
 * @template T 限制 `$el` 属性为扩展自 HTMLElement 的类型，默认为 HTMLDivElement
 * @description ComponentElRef 接口用于描述一个 Vue.js 组件实例中对底层原生 DOM 元素的引用对象。
 * 这个接口包含一个 `$el` 属性，该属性提供了对组件挂载到的 DOM 元素的直接访问。
 *
 * 示例：
 * ```typescript
 * interface MyComponent extends Vue {
 *   elRef: ComponentElRef<HTMLParagraphElement>;
 * }
 *
 * const component: MyComponent = new Vue({
 *   el: '#my-component',
 *   data() {
 *     return {
 *       // ...
 *     };
 *   },
 *   mounted() {
 *     // 使用 elRef 访问并操作组件对应的 DOM 元素
 *     this.elRef.$el.style.color = 'red';
 *   },
 *   computed: {
 *     // ...
 *   },
 *   methods: {
 *     // ...
 *   },
 *   components: {
 *     // ...
 *   },
 *   provide() {
 *     return {
 *       elRef: this.$refs.myDomElement as ComponentElRef<HTMLParagraphElement>
 *     };
 *   },
 * });
 * ```
 */
export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}
