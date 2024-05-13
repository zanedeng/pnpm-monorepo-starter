# @zkj/vue3store

🚀 **@zkj/vue3store** 是为 @zkj 生态打造的 Vue 3 专用状态管理库，它结合了 Vue 3 的最新特性和 Pinia 的强大功能，旨在提供高效、易用且类型安全的状态管理解决方案。

## 特性概览

- **Vue 3 集成**：无缝对接 Vue 3.4.21，充分利用 Vue 新特性，如 Composition API。
- **Pinia 集成**：基于 Pinia 2.1.7，带来简洁且高效的 Store 设计模式，支持模块化状态管理。
- **持久化状态**：集成 `pinia-plugin-persistedstate` 3.2.1，轻松实现状态持久化，跨页面保持用户数据。
- **自定义工具库**：内置 `@zkj/utils`（工作区引用），提供项目专属的实用函数与工具，提升开发效率。
- **TypeScript 支持**：采用 TypeScript 4.8.4 进行类型定义，保障代码的类型安全。
- **高效构建**：利用 `tsup` 6.4.0 进行打包，确保输出的代码体积小、加载快。

## 安装与使用

### 安装

```bash
npm install @zkj/vue3store
```

### 快速上手

1. **创建 Store**：使用 Pinia 的 API 创建状态管理模块。
2. **导入 Store**：在 Vue 组件中导入并使用 Store。
3. **状态持久化**：配置 `pinia-plugin-persistedstate` 以保存重要状态。

## 开发与维护

- **构建**：运行 `npm run build`，使用 `father build` 构建项目。
- **代码规范**：执行 `npm run lint` 自动修复 ESLint 和 Prettier 格式问题。
- **清理**：通过 `npm run clean` 清理缓存和依赖文件。

## 技术栈与环境

- **Node.js**：要求版本 >=16。
- **TypeScript**：支持最新的 TypeScript 特性。
- **构建工具**：采用 `tsup` 实现零配置打包。

## 项目结构与导出

- **主入口**：`./dist/index.js` 为 CJS 导出，`./dist/index.mjs` 为 ESM 导出。
- **类型声明**：`./dist/index.d.ts` 提供 TypeScript 类型定义。
- **开发环境**：源代码位于 `./src/index.ts`，便于调试与开发。

## 结语

**@zkj/vue3store** 旨在简化 Vue 3 应用的状态管理逻辑，通过高度集成和优化的工具链，助力开发者快速构建复杂应用，享受流畅的开发体验。
