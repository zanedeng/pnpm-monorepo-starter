import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'

/**
 * 定义 Lazy 泛型类型
 * @template T 泛型类型参数，表示懒加载目标数据的类型
 * @typedef {function(): Promise<T>} Lazy<T>
 * @description Lazy<T> 类型用于描述一个惰性加载函数，这个函数在调用时不会立即返回目标数据 T，而是返回一个 Promise，当 Promise 被解析时，才会提供所需的 T 类型数据。
 * 这种类型通常用于延迟加载大体积资源、按需加载模块或者实现懒加载逻辑的场景。
 *
 * 示例：
 * ```typescript
 * type ImageResource = Lazy<HTMLImageElement>;
 *
 * const loadImage: ImageResource = async () => {
 *   const image = new Image();
 *   image.src = 'path/to/image.jpg';
 *   await image.decode(); // 等待图片加载完成
 *   return image;
 * }
 *
 * // 使用
 * const myImage = loadImage();
 * myImage.then((image) => {
 *   document.body.appendChild(image);
 * });
 * ```
 */
type Lazy<T> = () => Promise<T>

/**
 * 定义路由记录项类型 RouteRecordItem，该类型扩展自 RouteRecordRaw 并添加了更多属性来详细描述一个路由配置项。
 *
 * @typedef {RouteRecordRaw & {
 *   path: string,
 *   name: string,
 *   meta: RouteMeta,
 *   children?: RouteRecordItem[],
 *   component?: RouteComponent | Lazy<RouteComponent> | string
 * }} RouteRecordItem
 *
 * @description
 * - `path` 字符串类型，表示路由的路径。
 * - `name` 字符串类型，作为路由的唯一标识名称，方便在编程式导航中引用。
 * - `meta` 类型为 RouteMeta，存储与路由相关的附加信息（如页面标题、权限标记等）。
 * - `children` 可选字段，是一个 RouteRecordItem 类型的数组，用于构建嵌套路由结构。
 * - `component` 可选字段，表示与当前路由关联的组件实例，可以是：
 *    - `RouteComponent` 类型，直接引用的路由组件；
 *    - `Lazy<RouteComponent>` 类型，表示此组件需要延迟加载；
 *    - 字符串类型，用于通过 Vue 异步组件机制引入组件。
 *
 * 注：此处假设 `RouteRecordRaw` 和 `RouteComponent` 为已有的类型定义，
 *     具体实现中需参照实际项目环境下的类型声明文件。
 */
export type RouteRecordItem = RouteRecordRaw & {
  path: string
  name: string
  meta: RouteMeta
  children?: RouteRecordItem[]
  component?: RouteComponent | Lazy<RouteComponent> | string
}
