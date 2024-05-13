/**
 * 定义 ViteEnv 接口
 * @interface ViteEnv
 * @description ViteEnv 接口用于描述 Vite 构建系统中使用的环境变量集合，这些变量通常在项目构建时由 Vite 插件或其他构建脚本注入到全局作用域中。
 *
 * - `VITE_USE_MOCK`: 布尔值，表示是否启用 mock 数据功能。
 * - `VITE_PUBLIC_PATH`: 字符串类型，指定应用的公共路径（public path）。
 * - `VITE_PROXY`: 二维字符串数组，用于配置代理规则。
 * - `VITE_GLOB_APP_TITLE`: 字符串类型，表示应用的全局标题（全称）。
 * - `VITE_GLOB_APP_SHORT_NAME`: 字符串类型，表示应用的简短名称或简称。
 * - `VITE_DROP_CONSOLE`: 布尔值，决定是否在生产环境中移除 console 语句。
 * - `VITE_USE_HTTPS`: 布尔值，决定是否在本地开发环境中强制使用 HTTPS 协议。
 * - `VITE_BUILD_COMPRESS`: 枚举类型，表示构建时使用的文件压缩方式，可选值有 'gzip'、'brotli' 或 'none'。
 * - `VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE`: 布尔值，决定构建时是否在压缩文件后删除原始文件。
 * - `VITE_USE_IMAGEMIN`: 布尔值，表示是否启用图片压缩优化。
 *
 * 示例：
 * ```typescript
 * const viteEnv = process.env as unknown as ViteEnv;
 * console.log(viteEnv.VITE_USE_MOCK); // 获取是否启用 mock 数据
 * ```
 */
export interface ViteEnv {
  VITE_USE_MOCK: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_DROP_CONSOLE: boolean
  VITE_USE_HTTPS: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_USE_IMAGEMIN: boolean
}
