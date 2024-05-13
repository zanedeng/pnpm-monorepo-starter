import type { ViteEnv } from '/@/ViteEnv'

/**
 * 定义 ImportMetaEnv 接口
 * @interface ImportMetaEnv
 * @extends ViteEnv
 * @description ImportMetaEnv 是一个扩展自 ViteEnv 接口的类型，用于描述在 ESM 模块导入元信息中提供的环境变量对象。
 * 此接口特别增加了一个 `__` 属性，它的类型被定义为 `never`，目的是禁止开发者直接访问或操作这个属性。
 *
 * `never` 类型在 TypeScript 中表示的是一个永远不存在的值，所以给 `__` 设置为 `never` 类型意味着编译器会在编译期间捕获任何试图访问或赋值给 `__` 属性的操作，从而避免潜在的问题。
 *
 * 示例：
 * ```typescript
 * import.meta.env.VITE_API_URL; // 访问 Vite 环境变量
 * import.meta.env.__; // 这行代码会导致 TypeScript 编译错误，因为 '__' 属性不允许访问
 * ```
 */
export interface ImportMetaEnv extends ViteEnv {
  __: never
}
