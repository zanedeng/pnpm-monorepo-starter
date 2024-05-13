/**
 * 定义 Window 接口扩展
 * @interface Window
 * @description 在 TypeScript 中，Window 接口代表了全局浏览器 window 对象，这里我们为它添加了一个额外的方法 `initGoogleMap`。
 *
 * `initGoogleMap` 方法用于初始化 Google Maps API，通常在实际项目中，我们需要在页面加载完毕后调用此方法来初始化地图服务。
 *
 * 示例：
 * ```typescript
 * declare global {
 *   interface Window {
 *     initGoogleMap: () => void;
 *   }
 * }
 *
 * // 在实际使用时
 * window.initGoogleMap();
 * ```
 */
export interface Window {
  /**
   * 初始化 Google Maps API 的方法
   */
  initGoogleMap: () => void
}
