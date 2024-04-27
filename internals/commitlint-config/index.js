const fs = require('fs')
const path = require('path')

const internals = fs.readdirSync(path.resolve(__dirname, '../'))
const packages = fs.readdirSync(path.resolve(__dirname, '../../packages/'))
const apps = fs.readdirSync(path.resolve(__dirname, '../../apps'))

/**
 * 获取项目内部、packages与apps目录下所有子目录名，合并到一个数组中作为有效的提交范围（scopes）列表。
 */
const scopes = [...internals, ...apps, ...packages]

/**
 * @fileoverview 此文件为Commitlint配置模块，用于规范和校验Git提交信息格式。
 * @module commitlint-config
 */

module.exports = {
  /**
   * 指定继承的基础配置。
   * @property {Array<string>} extends - 继承的基础配置名称。
   */
  extends: ['@commitlint/config-conventional'],
  /**
   * 自定义Commitlint规则集。
   * @property {Object} rules - 键值对形式的规则集合，键为规则名称，值为包含级别、是否启用及具体规则参数的数组。
   */
  rules: {
    'scope-enum': [2, 'always', scopes],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      1,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
  /**
   * 提交提示（prompt）配置项，增强命令行交互体验。
   * @property {Object} prompt - 提交提示相关配置。
   */
  prompt: {
    /**
     * 是否在提示中使用emoji表情。
     * @property {boolean} useEmoji
     */
    useEmoji: true,
    /**
     * 提交范围列表，用于在命令行交互时提供选项。
     * @property {Array<string>} scopes
     */
    scopes: [...scopes],
    /**
     * 是否允许一次提交选择多个范围。
     * @property {boolean} enableMultipleScopes
     */
    enableMultipleScopes: true,
    /**
     * 多个范围之间的分隔符。
     * @property {string} scopeEnumSeparator
     */
    scopeEnumSeparator: ',',
  },
}
