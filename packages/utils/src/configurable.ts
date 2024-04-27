import { isClient } from './verify'

/**
 * @typedef {Object} ConfigurableWindow
 * @property {Window=} window - 可选属性，用于指定一个自定义的 `window` 实例。当在处理iframe或测试环境时，可提供此选项以模拟窗口对象。
 * @example
 * ```javascript
 * const customWindow = {...};
 * const config: ConfigurableWindow = { window: customWindow };
 * ```
 * @description
 * 指定一个自定义的 `window` 实例，例如在处理iframes或测试环境时可能会用到。
 */
export interface ConfigurableWindow {
  window?: Window
}

/**
 * @typedef {Object} ConfigurableDocument
 * @property {Document=} document - 可选属性，用于指定一个自定义的 `document` 实例。当在处理iframe或测试环境时，可提供此选项以模拟文档对象。
 * @example
 * ```javascript
 * const customDocument = {...};
 * const config: ConfigurableDocument = { document: customDocument };
 * ```
 * @description
 * 指定一个自定义的 `document` 实例，例如在处理iframes或测试环境时可能会用到。
 */
export interface ConfigurableDocument {
  document?: Document
}

/**
 * @typedef {Object} ConfigurableNavigator
 * @property {Navigator=} navigator - 可选属性，用于指定一个自定义的 `navigator` 实例。当在处理iframe或测试环境时，可提供此选项以模拟navigator对象。
 * @example
 * ```javascript
 * const customNavigator = {...};
 * const config: ConfigurableNavigator = { navigator: customNavigator };
 * ```
 * @description
 * 指定一个自定义的 `navigator` 实例，例如在处理iframes或测试环境时可能会用到。
 */
export interface ConfigurableNavigator {
  navigator?: Navigator
}

/**
 * @typedef {Object} ConfigurableLocation
 * @property {Location=} location - 可选属性，用于指定一个自定义的 `location` 实例。当在处理iframe或测试环境时，可提供此选项以模拟location对象。
 * @example
 * ```javascript
 * const customLocation = {...};
 * const config: ConfigurableLocation = { location: customLocation };
 * ```
 * @description
 * 指定一个自定义的 `location` 实例，例如在处理iframes或测试环境时可能会用到。
 */
export interface ConfigurableLocation {
  location?: Location
}

/**
 * 获取默认的全局 `window` 对象，根据 `isClient` 判断是否处于浏览器客户端环境
 * @constant
 * @type {Window | undefined}
 */
export const defaultWindow = isClient ? window : undefined

/**
 * 获取默认的全局 `document` 对象，根据 `isClient` 判断是否处于浏览器客户端环境
 * @constant
 * @type {Document | undefined}
 */
export const defaultDocument = isClient ? window.document : undefined

/**
 * 获取默认的全局 `navigator` 对象，根据 `isClient` 判断是否处于浏览器客户端环境
 * @constant
 * @type {Navigator | undefined}
 */
export const defaultNavigator = isClient ? window.navigator : undefined

/**
 * 获取默认的全局 `location` 对象，根据 `isClient` 判断是否处于浏览器客户端环境
 * @constant
 * @type {Location | undefined}
 */
export const defaultLocation = isClient ? window.location : undefined
