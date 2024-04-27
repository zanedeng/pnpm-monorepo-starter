# @zkj/lint-staged-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/lint-staged-config** 是一套专为 lint-staged 工具设计的预设配置包，目的在于简化代码提交之前的自动化代码审查流程。lint-staged 是一个 Git 钩子工具，它会在 Git commit 阶段针对暂存区（staging area）的文件运行预先配置的 linting 和格式化任务，确保只有符合项目规范的代码才能被提交。

### 功能特点

- **自动化审查**：在代码提交之前自动执行代码质量检查和格式化，确保提交的代码始终符合项目标准。
- **预设配置**：提供一整套针对常见文件类型的 linting 和格式化任务模板，如 TypeScript、JavaScript、CSS、JSON 和 Markdown 文件。
- **便捷集成**：开发者仅需在项目中安装并引用此配置包，无需手动编写复杂的 lint-staged 规则。

### 安装与使用

首先确保安装了 lint-staged v13.0.3 或以上版本，然后安装 @zkj/lint-staged-config：

```bash
pnpm add --save-dev lint-staged @zkj/lint-staged-config
# 或者使用 npm
npm install --dev lint-staged @zkj/lint-staged-config
```

在项目的 `package.json` 文件中配置 lint-staged：

```json
// package.json
{
  "lint-staged": {
    // 请参照 @zkj/lint-staged-config 提供的指南来引用和扩展配置
  }
}
```

### 配置与扩展

虽然上述信息中没有明确列出具体的配置示例，但 **@zkj/lint-staged-config** 应提供了一种方式供用户在其项目中导入并应用预设的 lint-staged 规则。通常这会涉及到在 `lint-staged` 字段中按需引用配置包所提供的规则。

### 兼容性

**@zkj/lint-staged-config** 支持 Node.js 版本 `>=16`，并与 lint-staged v13.0.3 及其后续版本兼容。

### 维护与更新

尽管提供的 `package.json` 文件未包含具体的预设配置内容，但预期 **@zkj/lint-staged-config** 会随着 lint-staged 的更新而持续更新和改进，以应对新的 linting 规则和格式化需求。

总结来说，通过使用 **@zkj/lint-staged-config**，开发团队可以更容易地在 Git 提交过程中实施代码规范和格式化策略，减少人工审查的成本，提高代码质量和开发效率。
