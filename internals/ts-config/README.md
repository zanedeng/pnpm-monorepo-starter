# @zkj/ts-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/ts-config** 是专门为 TypeScript 项目打造的一套预设配置包，旨在简化 TypeScript 编译器配置流程，为开发团队提供统一、严谨且易于维护的 TypeScript 项目配置方案。通过使用这一配置包，开发者可以快速启动新项目，同时确保团队在多个项目之间保持一致的类型检查、编译选项和模块解析规则。

### 主要特性

- **预设编译选项**：包含了对目标 ES 版本、模块系统、严格模式、声明文件生成等关键编译选项的合理默认配置。
- **易用性**：只需在项目中安装并引用此配置包，然后在 `tsconfig.json` 文件中简单扩展即可。
- **可扩展性**：允许开发者根据项目需求自由扩展或覆盖预设配置，以适应特定应用场景。

### 安装与使用

确保已全局或在项目中安装 TypeScript，然后安装 @zkj/ts-config：

```bash
pnpm add --save-dev typescript @zkj/ts-config
# 或
npm install --save-dev typescript @zkj/ts-config
```

在项目根目录下创建或编辑 `tsconfig.json` 文件，引用并应用 @zkj/ts-config 的配置：

```json
{
  "extends": "@zkj/ts-config",
  "compilerOptions": {
    // 可在此处添加或覆盖原有配置项
  },
  "include": [
    "src/**/*"
  ],
  // 其他项目特定配置...
}
```

### 配置详情

**@zkj/ts-config** 提供的预设编译选项考虑到了 TypeScript 最佳实践，力求兼顾开发效率与代码质量。此外，该配置还可能包括对路径映射（paths）、第三方类型声明（typeRoots）、模块解析（moduleResolution）等方面的优化配置。

包内包含了多个预设配置文件，如：

- `base.json`: 基础通用配置文件，可能包含TypeScript最基础和广泛适用的编译选项。
- `docs.json`: 可能是针对文档生成工具（如TypeDoc）优化的特殊编译配置。
- `node.common.json` 和 `node.module.json`: 这两个文件可能是针对Node.js项目的不同模块化方案（如CommonJS或ES模块）定制的配置。
- `vite.json`: 针对使用Vite构建工具的前端项目所设计的TypeScript配置。
- `vitest.json`: 专为Vitest测试框架配置的TypeScript编译选项。
- `web.json`: 针对浏览器环境编写的Web前端项目的预设配置。

### 兼容性

本项目兼容 TypeScript 的最新稳定版本，并随着 TypeScript 的发展持续更新和优化配置。

通过采纳 **@zkj/ts-config**，您的团队能够在 TypeScript 项目开发过程中享受到标准化配置所带来的好处，有效提高代码质量、降低维护成本，并提升团队协作效率。
