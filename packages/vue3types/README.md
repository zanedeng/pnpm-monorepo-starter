# @zkj/vue3types

🚀 **@zkj/vue3types** 是一个专为 @zkj 项目定制的 Vue 3 类型声明包，旨在提供 Vue 3 应用所需的高质量类型支持，增强开发体验和代码安全性。

## 特性

- **Vue 3 集成**：无缝适配 Vue 3.x 版本，支持最新特性和最佳实践。
- **Pinia 集成**：集成 Pinia 状态管理库 2.1.7 版本，为您的应用状态管理提供类型安全。
- **Vue Router 支持**：包含 Vue Router 4.3.0，确保路由配置和导航的类型安全。
- **类型声明**：提供详尽的 TypeScript 类型定义，助力强类型开发。
- **开发工具**：借助 TypeScript 4.8.4 版本和 `tsup` 构建工具，确保高效、现代化的开发流程。

## 依赖库介绍

### 开发依赖（devDependencies）

- **tsup**：版本 ^6.4.0，是一个零配置的 TypeScript 打包工具，用于构建高性能的 ES module 和 CommonJS 输出，支持 Tree-shaking 和自动处理类型声明文件。
- **typescript**：版本 ^4.8.4，是 TypeScript 编程语言的官方编译器，提供强大的静态类型检查、类型推断等功能，支持最新的 JavaScript 和 TypeScript 语言特性。

### 依赖库（dependencies）

- **@zkj/constants**：通过工作区引用（workspace:\*），提供项目中使用的常量和枚举类型，确保这些基础数据的统一管理和类型安全。
- **pinia**：版本 2.1.7，Vue 3 的状态管理库，以简洁直观的方式管理应用状态，支持类型推断和复杂的 Store 设计。
- **vue**：版本 3.4.21，Vue.js 的最新版本，提供反应式、组件化的前端开发框架，支持 Composition API、Teleport、Suspense 等高级特性。
- **vue-router**：版本 4.3.0，Vue 3 的官方路由库，用于构建单页面应用的路由系统，支持动态路由、嵌套路由、懒加载等功能，完全类型安全。

## 快速开始

1. **安装**：确保你的项目已使用 Vue 3，并安装此包。

   ```bash
   npm install @zkj/vue3types
   ```

2. **引入**：在你的项目中，根据需要引入 Vue、Pinia 和 Vue Router 的类型和功能。

3. **配置**：如有需要，参照文档配置 Pinia 和 Vue Router，享受类型安全的开发体验。

## 构建与开发

- **构建**：运行 `npm run build` 命令，使用 `father build` 进行项目构建。
- **代码质量**：通过 `npm run lint` 运行 ESLint 和 Prettier 自动修复代码格式和风格问题。
- **清理**：使用 `npm run clean` 清理缓存和构建产物。

## 环境要求

- **Node.js**：版本需 >=16。

通过 @zkj/vue3types，你将获得一个健壮、类型安全的 Vue 3 开发环境，加速开发进程，提升代码质量。
