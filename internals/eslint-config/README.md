# @zkj/eslint-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/eslint-config** 是一套专为 ESLint 设计的可共享代码风格和规则配置包，旨在为 JavaScript 和 TypeScript 项目提供统一且严格的代码质量保障。这套配置结合了多种流行和实用的 ESLint 插件，覆盖了代码规范、类型安全、代码优化等多方面的检验需求。

### 主要特性

- **全面的规则集合**：预设了适用于现代前端项目的高质量 ESLint 规则，包括但不限于 TypeScript 支持、import 引入检查、Markdown 文件检查、Vue 文件检查等。
- **易用性**：只需将 @zkj/eslint-config 添加至项目，并在 `.eslintrc.*` 文件中引用，即可轻松应用整套代码规范。
- **广泛的生态支持**：兼容多种开发环境和框架，如 TypeScript、Vue.js，同时支持 JSONC 和 YAML 文件的格式检查。
- **与 Prettier 结合**：内置了 eslint-config-prettier 和 eslint-plugin-prettier，以避免 ESLint 和 Prettier 之间的冲突，并确保代码既符合 ESLint 规则又遵循 Prettier 的格式化标准。

### 安装与使用

首先，确保全局或本地已安装 ESLint v8.25.0 或更高版本。然后，在项目中安装 `@zkj/eslint-config` ：

```bash
pnpm add --save-dev @zkj/eslint-config
# 或者使用 npm
npm install --save-dev @zkj/eslint-config

```

在项目根目录下的 ESLint 配置文件（如 `.eslintrc.js` 或 `.eslintrc.yaml`）中引用此配置：

```javascript
// 在 .eslintrc.js 中
module.exports = {
  extends: ['@zkj/eslint-config'],
  rules: {/* 自定义额外规则 */}
};
```

### 配置与拓展

**@zkj/eslint-config** 默认提供了完善的规则集合，但同时也支持根据项目需求自定义规则。

### 兼容性

该项目要求 Node.js 版本 `>=16`。

### 维护与更新

**@zkj/eslint-config** 会随着 ESLint 及相关插件的最新版本持续更新，确保始终支持最新的语言特性和最佳实践。

借助 **@zkj/eslint-config**，开发团队可以更加高效地遵循一致的编码规范，提升代码质量，降低沟通成本，让团队合作更加顺畅。