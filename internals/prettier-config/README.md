# @zkj/prettier-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/prettier-config** 是一个专门针对 Prettier 代码格式化工具设计的共享配置包，旨在为开发团队提供一致且易于管理的代码格式化标准。通过此配置包，您可以快速在多个项目中应用统一的代码格式化规则，促进团队间代码风格的一致性，并简化 Prettier 的日常使用与维护。

### 主要特性

- **预设格式化规则**：提供一套精心编排的 Prettier 格式化规则集合，覆盖了 JavaScript、TypeScript、CSS、HTML、Markdown 等多种常见文件类型。
- **易于集成**：只需在项目中安装并引用此配置包，然后在 `.prettierrc.js` 或 `prettier.config.js` 文件中简单配置即可生效。
- **灵活性**：允许用户在继承基本配置的基础上进行个性化扩展或覆盖，以适应项目特定的需求。

### 安装与使用

首先，确保已全局或在项目中安装了 Prettier。然后安装 @zkj/prettier-config：

```bash
pnpm add --save-dev prettier @zkj/prettier-config
# 或
npm install --save-dev prettier @zkj/prettier-config
```

在项目根目录下创建或编辑 `.prettierrc.js` 或 `prettier.config.js` 文件，引入并应用 @zkj/prettier-config 的配置：

```javascript
// .prettierrc.js 或 prettier.config.js
module.exports = {
  ...require('@zkj/prettier-config'),
  // 这里可以添加或覆盖原有配置项
};
```

### 配置详情

**@zkj/prettier-config** 内置的规则涵盖了诸如打印宽度（printWidth）、Tab缩进大小（tabWidth）、是否使用 Tab 进行缩进（useTabs）、行尾分号（semi）、引号类型（quoteProps、quotes）等核心配置项。具体配置内容请参考项目文档或查看配置文件源码。

### 兼容性

本项目兼容 Prettier 的最新稳定版本，确保与不断发展的前端生态体系保持同步。

通过使用 **@zkj/prettier-config**，您的团队可以集中精力于业务逻辑的实现，不必再为代码格式化规范产生分歧，提升整个团队的工作效率和代码可读性。
