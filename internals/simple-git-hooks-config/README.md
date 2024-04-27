# @zkj/simple-git-hooks-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/simple-git-hooks-config** 是一个为 [simple-git-hooks](https://github.com/soixantecircuits/simple-git-hooks) 库提供的预设配置包，致力于简化 Git 钩子的设置与管理过程。通过这个配置包，您可以快速地在项目中应用一系列标准化的 Git 钩子脚本，从而在关键的 Git 操作阶段执行诸如代码检查、格式化、测试等一系列自动化任务。

### 主要特性

- **预设钩子脚本**：提供了丰富的 Git 钩子配置示例，包括但不限于 pre-commit、pre-push、post-checkout 等各个阶段的脚本。
- **灵活配置**：允许开发团队根据自身需求扩展或自定义 Git 钩子行为，同时保证对原生 Git Hooks 的完整支持。
- **开箱即用**：只需在项目中安装并引用此配置包，按照简单的步骤配置，即可立即启用相应的 Git 钩子功能。

### 安装与使用

首先，确保已全局或在项目中安装了 simple-git-hooks。然后安装 simple-git-hooks-config：

```bash
pnpm add --save-dev simple-git-hooks @zkj/simple-git-hooks-config
# 或
npm install --save-dev simple-git-hooks simple-git-hooks-config
```

在项目中初始化并应用 simple-git-hooks-config 配置：

```bash
npx simple-git-hooks init
# 或
yarn simple-git-hooks init
```

然后在项目的 `.simple-git-hooks.yml` 配置文件中引用并扩展 simple-git-hooks-config 的预设配置：

```yaml
extends: '@zkj/simple-git-hooks-config'
hooks:
  # 这里可以添加或覆盖原有配置项
  pre-commit:
    - command: "npm run lint"
```

### 配置详情

**simple-git-hooks-config** 包含了一系列预设的 Git 钩子脚本配置，它们可用于执行各种任务，比如在 `pre-commit` 期间运行代码格式化和静态分析工具，或者在 `pre-push` 时触发单元测试和构建流程。

### 兼容性

本项目兼容 simple-git-hooks 的最新稳定版本，并且支持主流的 Node.js 环境。

通过使用 **simple-git-hooks-config**，您的团队可以在享受 Git 钩子带来的自动化便利的同时，有效确保每一次的 Git 操作都能符合团队代码质量与流程规范的要求，从而提高软件开发的质量与效率。
