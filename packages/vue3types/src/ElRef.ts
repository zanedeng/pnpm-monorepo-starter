import type { Nullable } from '/@/Nullable'

/**
 * 定义 ElRef 泛型类型
 * @typedef {Nullable<T>} ElRef<T>
 * @template T 限制引用指向的DOM元素类型，默认为HTMLDivElement
 * @description ElRef 类型用于描述一个对原生 HTML 元素的可空引用，它可以是类型 T （表示某种 HTML 元素，如 HTMLDivElement），也可以是 null，表示引用的 DOM 元素可能不存在或已被移除。
 *
 * 这种类型主要用于处理在动态或不确定的条件下获取到的 DOM 元素引用，以防止在元素不存在时引发错误。
 *
 * 示例：
 * ```typescript
 * let elementRef: ElRef<HTMLDivElement>;
 *
 * const getElementReference = (): ElRef<HTMLDivElement> => {
 *   const domElement = document.getElementById('my-element');
 *   return domElement ? domElement as HTMLDivElement : null;
 * };
 *
 * elementRef = getElementReference();
 *
 * if (elementRef) {
 *   // 当 elementRef 不为空时，可以安全地访问和操作对应的 DOM 元素
 *   elementRef.style.backgroundColor = 'green';
 * } else {
 *   console.log('Element reference not found.');
 * }
 * ```
 */
export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
