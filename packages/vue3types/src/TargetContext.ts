/**
 * 定义 TargetContext 枚举类型
 * @typedef {('_self'|'_blank')} TargetContext
 * @description TargetContext 类型用于指定超链接或表单提交的目标上下文，常见于HTML的`<a>`标签和`<form>`标签的`target`属性。
 *
 * - `_self`：默认值，表示在当前窗口或标签页打开链接或处理表单提交结果。
 * - `_blank`：在一个新的浏览器窗口或标签页中打开链接。
 *
 * 示例：
 * ```html
 * <!-- 使用 TargetContext 类型作为 target 属性 -->
 * <a href="https://www.example.com" target="_blank">打开新窗口</a>
 * <form action="/submit" method="post" target="_self">...</form>
 * ```
 */
export type TargetContext = '_self' | '_blank'
