/**
 * @module eslint-config
 * @description 该模块导出了一个ESLint配置对象，它包含了适用于JavaScript、TypeScript、Vue.js以及Markdown等多种文件类型的代码质量检测规则。
 */
module.exports = {
  /**
   * @property {Object} env - 指定当前项目所处的环境，启用ES6特性、浏览器环境和Node.js环境。
   */
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  /**
   * @property {Array<string>} plugins - 列出使用的ESLint插件，主要包括`@typescript-eslint`、`prettier`等，用于增强对TypeScript和代码格式化的检查能力。
   */
  plugins: ['@typescript-eslint', 'prettier'],
  /**
   * @property {Array<string>} extends - 继承一系列推荐的ESLint规则集，涵盖了基本的eslint推荐规则、import插件的推荐规则、JSONC和Markdown文件的规则，以及Vue3、TypeScript和Prettier的相关规则。
   */
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:markdown/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  /**
   * property {Object} settings - 设置特殊解析器配置，例如`import/resolver`用来解析多种扩展名的文件，包括`.js`, `.mjs`, `.ts`, `.d.ts`, `.tsx`。
   */
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] },
    },
  },
  /**
   * * @property {Array<Object>} overrides - 针对特定文件或文件模式覆盖默认规则，例如：
   * - 使用`jsonc-eslint-parser`解析JSON和JSON-like文件。
   * - 对于TypeScript和Vue文件，关闭`no-undef`规则。
   * - 在测试目录下的文件中，关闭`no-console`规则，并允许单文件中有多个Vue组件。
   * - 对`package.json`文件，也使用`jsonc-eslint-parser`并设定`jsonc/sort-keys`规则以确保键值按照固定顺序排列。
   * - 对`.d.ts`文件禁用`import/no-duplicates`规则。
   * - 允许`.js`文件使用`var`关键字，关闭`@typescript-eslint/no-var-requires`规则。
   * - 针对`.vue`文件，使用`vue-eslint-parser`并结合`@typescript-eslint/parser`进行解析，同时关闭`no-undef`规则。
   */
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc', '*rc'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['**/__tests__/**'],
      rules: {
        'no-console': 'off',
        'vue/one-component-per-file': 'off',
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'name',
              'version',
              'private',
              'packageManager',
              'description',
              'type',
              'keywords',
              'homepage',
              'bugs',
              'license',
              'author',
              'contributors',
              'funding',
              'files',
              'main',
              'module',
              'exports',
              'unpkg',
              'jsdelivr',
              'browser',
              'bin',
              'man',
              'directories',
              'repository',
              'publishConfig',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'optionalDependencies',
              'dependencies',
              'devDependencies',
              'engines',
              'config',
              'overrides',
              'pnpm',
              'husky',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-undef': 'off',
      },
    },

    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'],
      rules: {
        'no-console': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  /**
   * @property {Object} rules - 定义了一系列具体的代码风格和错误检查规则，覆盖JavaScript、TypeScript、Vue.js以及其它方面：
   * - **JavaScript / TypeScript 规则**：
   *   - 强制使用驼峰式命名法，但对于属性名始终不允许转换（properties: 'never'）。
   *   - 关闭全局的`no-console`警告，允许在某些情况下使用console输出。
   *   - 强制避免无条件断点、禁止使用受限语法结构、禁止不必要的await返回、强制使用let和const替代var、不允许空catch块等。
   * - **最佳实践规则**：
   *   - 强制数组回调函数有返回值、作用域内变量绑定、禁止alert调用、禁止在switch case中声明变量、禁止多行字符串字面量、禁止with语句、禁止无意义的void表达式等。
   * - **代码风格问题**：
   *   - 建议使用指数运算符而非Math.pow()。
   * - **TypeScript 特殊规则**：
   *   - 关闭对显式模块边界类型的检查、禁用any类型、禁用非空断言等。
   * - **Vue.js 特殊规则**：
   *   - 关闭对v-html指令的限制、允许props无需默认值、允许隐式 emits、允许多词组组件名、禁用从非Vue导入Vue实例等Vue相关的规则。
   * - **导入规则**：
   *   - 强制导入语句按特定顺序出现，例如首先导入内置模块、外部模块，接着是内部模块，然后是类型引用，并且特别指定了CSS等样式文件应放在最后导入。
   */
  rules: {
    // js/ts
    camelcase: ['error', { properties: 'never' }],
    // 'no-console': ['warn', { allow: ['error'] }],
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-return-await': 'error',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prefer-const': [
      'warn',
      { destructuring: 'all', ignoreReadBeforeAssign: true },
    ],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],
    'object-shorthand': [
      'error',
      'always',
      { ignoreConstructors: false, avoidQuotes: true },
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    // best-practice
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',

    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    // stylistic-issues
    'prefer-exponentiation-operator': 'error',

    // ts
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false },
    ],
    '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],
    '@typescript-eslint/ban-types': 'off',

    // vue
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // prettier
    'prettier/prettier': 'error',

    // import
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'nuxt',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@zkj/**',
            group: 'external',
            position: 'after',
          },
          // always put css import to the last, ref:
          // https://github.com/import-js/eslint-plugin-import/issues/1239
          {
            pattern: '*.+(css|sass|less|scss|pcss|styl)',
            group: 'unknown',
            patternOptions: { matchBase: true },
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
        // example: let `import './nprogress.css';` after importing others
        // in `packages/docusaurus-theme-classic/src/nprogress.ts`
        // see more: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#warnonunassignedimports-truefalse
        warnOnUnassignedImports: true,
      },
    ],
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/named': 'off',

    // eslint-plugin-eslint-comments
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
}
