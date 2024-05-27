import type { PropType } from 'vue'

/**
 * 定义有效的按钮颜色枚举集合，其中包含了 'primary'、'error'、'warning'、'success' 以及空字符串 ''，
 * 这些字符串是类型安全的，因为它们使用了 TypeScript 的 'as const' 关键字进行声明。
 */
const validColors = ['primary', 'error', 'warning', 'success', ''] as const

/**
 * 定义 ButtonColorType 类型别名，该类型表示 Button 组件的颜色属性可接受的有效颜色值，
 * 其取值范围为上述 `validColors` 枚举类型的成员。
 */
type ButtonColorType = typeof validColors[number]

/**
 * 定义 Button 组件的 Props 对象。
 */
export const buttonProps = {
  /**
   * 指定按钮的颜色，类型为 ButtonColorType，该类型限制了颜色属性必须是有效颜色枚举中的一个值。
   * 同时，通过自定义验证器函数确保传递给 color 的值是有效的颜色枚举。
   */
  color: {
    type: String as PropType<ButtonColorType>,
    validator: (v: ButtonColorType) => validColors.includes(v),
    default: '',
  },
  /**
   * 表示按钮是否处于加载状态，类型为布尔值。
   */
  loading: { type: Boolean },
  /**
   * 表示按钮是否禁用，类型为布尔值。
   */
  disabled: { type: Boolean },
  /**
   * 指定按钮前置图标的名称或类名，类型为字符串。
   */
  preIcon: { type: String },
  /**
   * 指定按钮后置图标的名称或类名，类型为字符串。
   */
  postIcon: { type: String },
  /**
   * 指定按钮图标的大小，默认值为14像素，类型为数字。
   */
  iconSize: { type: Number, default: 14 },
  /**
   * 指定按钮点击时执行的回调函数，可以是单个函数或函数数组，类型为 Function 或 Function 数组，具有默认值 null。
   */
  onClick: {
    type: [Function, Array] as PropType<(() => any) | (() => any)[]>,
    default: null,
  },
  /**
   * 指定按钮显示的文本内容，类型为字符串。
   */
  text: { type: String },
}
