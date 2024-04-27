# @zkj/stylelint-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

🚀 **@zkj/stylelint-config** 是专为 Stylelint CSS 代码检测工具打造的一款共享配置包，旨在为开发团队提供一种统一、严格且易于维护的 CSS、Sass 和 Less 样式表代码规范。这款配置包整合了各类 Stylelint 规则，确保团队成员在编写样式代码时遵循一致的标准，提升代码质量和团队协作效率。

### 主要特性

- **全面的规则覆盖**：包括但不限于 CSS 语法规则、样式排序、选择器规范、属性值限制等众多细节，特别关注 Sass 和 Less 的预处理器语法支持。
- **多场景适用**：不仅适用于常规 CSS，还支持 Vue 单文件组件（SFCs）内的内联样式和 SCSS/Less 预处理器。
- **与知名 Stylelint 配置兼容**：基于 `stylelint-config-standard`、`stylelint-config-recommended`、`stylelint-config-recommended-scss` 等知名配置进行扩展，确保紧跟行业最佳实践。

### 安装与使用

首先确保全局或项目中已安装 Stylelint v14.13.0 或更高版本。然后安装 @zkj/stylelint-config 及其依赖：

```bash
npm install --save-dev stylelint@^14.14.1 @zkj/stylelint-config
# 或
yarn add --dev stylelint@^14.14.1 @zkj/stylelint-config
```

在项目根目录下创建或编辑 `.stylelintrc.js` 或 `stylelint.config.js` 文件，引用并应用 @zkj/stylelint-config 的配置：

```javascript
// .stylelintrc.js 或 stylelint.config.js
module.exports = {
  extends: ['@zkj/stylelint-config'],
  // 可在此处添加或覆盖原有配置项
};
```

### 配置亮点

**@zkj/stylelint-config** 依赖了以下配置和插件，共同实现了对 CSS、Sass、Less 及 Vue 文件的全方位样式代码检查：

- **stylelint-config-prettier**：消除 Stylelint 与 Prettier 之间的冲突。
- **stylelint-config-recommended** 和 **stylelint-config-recommended-scss**：包含通用 CSS 和 SCSS 推荐规则。
- **stylelint-config-standard** 和 **stylelint-config-standard-scss**：提供了严格的 CSS 和 SCSS 代码规范。
- **stylelint-config-recommended-vue**：针对 Vue SFC 内嵌样式提供推荐规则。
- **stylelint-order**：确保样式声明按特定顺序排列，提升代码可读性。

### 兼容性

本项目要求 Node.js 版本 `>=16`，并且兼容 Stylelint v14.13.0 及后续版本。

通过采用 **@zkj/stylelint-config**，您的团队能够拥有一个强大且可扩展的样式代码质量管控工具，助您在项目开发过程中始终保持代码风格的一致性和高品质。
