import { onMounted, onUnmounted } from 'vue'
import hotkeys from 'hotkeys-js'

/**
 * 一个用于在组件挂载/卸载时自动注册和注销热键的自定义 Hook。
 *
 * **示例：**
 * ```typescript
 * import { useHotkeys } from '@zkj/vue3hooks';
 *
 * export default {
 *   setup() {
 *     const removeSaveHotkey = useHotkeys('ctrl+s', (event) => {
 *       console.log('保存快捷键已触发');
 *       // 在这里执行保存操作
 *     });
 *
 *     // ... 其他组件逻辑 ...
 *
 *     // 当不再需要监听此热键时，可以调用返回的注销函数
 *     // removeSaveHotkey();
 *
 *     return {};
 *   },
 * };
 * ```
 *
 * @param {string} combos - 要监听的一个或多个热键组合。
 * @param {(event: KeyboardEvent) => void} handler - 当热键触发时将执行的回调函数。
 * @returns {() => void} 手动注销已注册热键的函数。
 */
export function useHotkeys(
  combos: string,
  handler: (event: KeyboardEvent) => void
) {
  // 组件挂载时注册热键
  onMounted(() => {
    // 使用 hotkeys-js 的 bind 方法注册快捷键
    hotkeys(combos, (event: KeyboardEvent): void | boolean => {
      // 调用传入的 handler 函数
      handler(event)
    })
  })

  // 组件卸载时移除热键
  onUnmounted(() => {
    // 使用 hotkeys-js 的 unbind 方法取消注册快捷键
    hotkeys.unbind(combos)
  })

  // 返回一个解绑函数，以便在需要时提前解除绑定
  return () => {
    hotkeys.unbind(combos)
  }
}
