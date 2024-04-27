# pnpm-monorepo-starter

**项目简介**

`pnpm-monorepo-starter` 是一个基于 pnpm、pnpm-workspace 和 Changeset 构建的 Monorepo（单一仓库多项目管理）工程模板。该项目旨在简化多项目在同一代码仓库内协同开发与发布的流程，提供了一套预设的脚本与依赖工具集。

---

## 主要特点

- 使用 **pnpm** 作为包管理器，得益于其高效的依赖安装与扁平化存储机制，有效减少磁盘空间占用及提升构建速度。
- 集成了 **pnpm-workspace**，允许在单个目录下管理多个相互依赖的项目，统一管理各个子项目的依赖版本。
- 采用 **Changeset** 管理版本变更与发布流程，确保每次发布的变更都有清晰的 changelog 记录。

---

## 开发依赖功能详解

### devDependencies

以下是 `pnpm-monorepo-starter` 中 devDependencies 部分列出的主要开发依赖及其用途：

- **@changesets/cli** (`^2.22.0`)：提供命令行工具用于生成和管理变更集（changesets），帮助自动化版本管理和生成changelog。

- **@commitlint/cli** (`^17.0.0`) 及 **@commitlint/config-conventional** (`^17.0.0`)：共同组成 CommitLint 工具，用于规范化提交信息格式，遵循 Angular 规范（Conventional Commits）。

- **@typescript-eslint/eslint-plugin** (`^5.24.0`) 和 **@typescript-eslint/parser** (`^5.24.0`)：集成在 ESLint 中，为 TypeScript 项目提供额外的 lint 规则和解析器，增强代码质量控制。

- **commitizen** (`^4.2.4`)：提供交互式的 git commit 命令，保证提交信息符合约定式提交规范。

- **cz-conventional-changelog** (`^3.3.0`)：作为 commitizen 的 adapter，配合生成符合 Conventional Changelog 格式的提交信息。

- **eslint** (`^8.15.0`)：JavaScript 代码质量工具，用于静态检查代码，预防潜在错误和实现编码规范一致性。

- **father-build** (`^1.22.1`)：构建工具，提供简洁而强大的构建配置方案，适用于 JavaScript 和 TypeScript 项目。

- **husky** (`^8.0.1`)：用于在 Git Hooks 上设置预定义脚本，如 pre-commit、pre-push 等，确保在提交前完成必要的代码质量检查。

- **lint-staged** (`^12.4.1`)：配合 husky 在暂存区（staged）的文件上执行 linting 和格式化任务，确保只有符合规范的代码才能被提交。

- **rimraf** (`^3.0.2`)：一个深度删除文件和目录的 Node.js 库，用于清理项目中的临时文件和不需要的输出。

- **typescript** (`^4.6.4`)：Microsoft 维护的开源编程语言，提供静态类型检查，是 JavaScript 的超集，广泛应用于大型项目开发中。

---

## 更多信息

欲了解更多信息或参与贡献，请访问本项目的官方 GitHub 页面：

- [GitHub 仓库](https://github.com/zanedeng/pnpm-monorepo-starter)
- [问题与反馈](https://github.com/zanedeng/pnpm-monorepo-starter/issues)

欢迎 Fork 并 Star 本项目，一起探索和优化 Monorepo 管理的最佳实践！
