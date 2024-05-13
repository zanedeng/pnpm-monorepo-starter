/**
 * @typedef {('none' | 'modal' | 'message' | undefined)} ErrorMessageMode
 *
 * @description
 * `ErrorMessageMode` 是一个枚举类型，用于指定错误消息的显示方式：
 * - `'none'`：不展示任何错误消息，适用于不需要用户交互的场景或自行处理错误提示的情况。
 * - `'modal'`：以模态窗口的形式展示错误消息，通常用于需要用户确认或查看详情的错误提示。
 * - `'message'`：以全局消息通知的方式展示错误消息，例如 Toast 或 Snackbar 提示，适合轻量级的通知反馈。
 * - `undefined`：默认值，含义取决于具体的上下文，可能按照框架内置的默认策略处理错误消息展示，或者不作任何特殊处理。
 *
 * 这个类型常用于设置 API 请求失败时错误信息的呈现方式。
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
