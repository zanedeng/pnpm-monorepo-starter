/**
 * 定义 LabelValueOptions 泛型类型
 * @typedef {Array<{label: string, value: any, [key: string]: string | number | boolean}>} LabelValueOptions
 * @description LabelValueOptions 类型表示一个对象数组，数组中的每个对象至少包含两个固定属性：label 和 value。
 * - `label` 属性为字符串类型，通常用于显示选项的文字描述；
 * - `value` 属性为任意类型，用于存储选项的实际值；
 * - 同时，每个对象还可以包含额外的键值对属性，键为字符串类型，值可以是字符串、数字或布尔值。
 *
 * 示例：
 * ```typescript
 * const options: LabelValueOptions = [
 *   { label: 'Apple', value: 'fruit-1', isAvailable: true },
 *   { label: 'Banana', value: 'fruit-2', quantity: 10 },
 *   { label: 'Cherry', value: 'fruit-3', rating: 4.5 }
 * ];
 * ```
 * 上述示例中，options 数组中的每个元素都是一个对象，除了必填的 `label` 和 `value` 属性外，还有自定义的额外属性，如 `isAvailable`、`quantity` 和 `rating`。
 */
export type LabelValueOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]
