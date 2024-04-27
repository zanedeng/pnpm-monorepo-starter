# @zkj/commitlint-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/commitlint-config** 是一个专门为 [commitlint](https://commitlint.js.org/) 工具定制的 Git 提交消息格式规则配置包。通过使用本配置包，您可以确保您的项目遵循一致且标准的提交消息规范，提高版本控制的历史记录可读性和团队协作效率。

### 主要特性

- 基于 [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) 规范，遵循业界广泛认可的 Conventional Commits 标准。
- 内置了针对 Git 提交消息格式的严格校验规则。

### 安装与使用

在您的项目中安装 **@zkj/commitlint-config** 以及其他相关依赖：

```bash
pnpm add --save-dev @zkj/commitlint-config
# 或者使用 npm
npm install --save-dev @zkj/commitlint-config
```

接下来，在您的项目根目录创建或编辑 `.commitlintrc.js` 文件，引入并应用本配置包：

```javascript
module.exports = {
  extends: ['@zkj/commitlint-config'],
};
```

### 依赖项说明

#### Dependencies

- **@commitlint/cli**: 版本 `17.2.0`，提供命令行工具，用于执行提交消息格式的校验。
- **@commitlint/config-conventional**: 版本 `17.2.0`，包含了遵循 Conventional Commits 规范的一组预设规则。
- **@types/node**: 最新版本，为 Node.js 提供 TypeScript 类型声明文件，增强 TypeScript 编程环境下的类型安全性。
- **czg**: 版本 `^1.3.12`，这是一个假设您使用的自定义 commitizen adapter，用于指导用户按照指定格式提交代码变更。

#### Scripts

- **clean**: 执行清理操作，包括清除缓存和删除 `dist` 目录。
- **clean:cache**: 清除 `.turbo` 缓存目录（此处可能是 turbo 模块或其他工具的缓存）和 `dist` 发布目录。
- **clean:deps**: 删除 `node_modules` 目录，用于重新安装依赖。

### 兼容性

该项目适用于 Node.js 版本 `>=16`。

---

感谢您选用 @zkj/commitlint-config，如有任何问题或建议，请随时发起 issue 或 pull request。祝您编码愉快！