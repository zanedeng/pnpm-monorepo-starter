import { defaultDocument } from '../configurable'
import { noop } from '../func'
import type { ConfigurableDocument } from '../configurable'

/**
 * 创建并加载 `<script>` 标签的可选配置对象接口。
 * 扩展自 `ConfigurableDocument` 接口，用于指定 `<script>` 标签的属性和加载行为。
 *
 * @interface CreateScriptTagOptions
 * @extends ConfigurableDocument
 * @property {boolean} [immediate=true] - 是否立即加载脚本，默认为 `true`
 * @property {string} [type='text/javascript'] - 脚本类型，默认为 `'text/javascript'`
 * @property {boolean} [async] - 是否添加 `async` 特性到 `<script>` 标签
 * @property {boolean} [defer] - 是否添加 `defer` 特性到 `<script>` 标签，默认为 `true`
 * @property {'anonymous' | 'use-credentials'} [crossOrigin] - 跨域资源共享模式
 * @property {Record<string, string>} [attrs] - 自定义 `<script>` 标签的附加属性集合
 */
export interface CreateScriptTagOptions extends ConfigurableDocument {
  /**
   * 控制脚本是否应立即加载。
   * 若设置为 `false`，脚本可能不会立刻插入文档流中，依据其他配置决定何时加载。
   *
   * @default true
   * @property {boolean} [immediate=true]
   */
  immediate?: boolean

  /**
   * 指定 `<script>` 标签的 `type` 属性，用于指定脚本语言类型。
   *
   * @default 'text/javascript'
   * @property {string} [type='text/javascript']
   */
  type?: string

  /**
   * 是否在 `<script>` 标签上添加 `async` 特性，指示脚本执行不应阻塞文档解析。
   *
   * @property {boolean} [async]
   */
  async?: boolean

  /**
   * 是否在 `<script>` 标签上添加 `defer` 特性，指示脚本应在文档解析完成后（但在 `DOMContentLoaded` 事件触发前）执行。
   *
   * @property {boolean} [defer]
   */
  defer?: boolean

  /**
   * 指定 `<script>` 标签的 `crossorigin` 特性，用于设置跨域资源共享策略。
   *
   * @property {'anonymous' | 'use-credentials'} [crossOrigin]
   */
  crossOrigin?: 'anonymous' | 'use-credentials'

  /**
   * 自定义 `<script>` 标签上的附加属性集合。
   * 键为属性名，值为属性值。
   *
   * @property {Record<string, string>} [attrs]
   */
  attrs?: Record<string, string>
}

/**
 * 创建并管理一个 `<script>` 标签的函数。
 * 根据提供的 `src` 地址加载外部脚本，并可以自定义标签属性以及监听脚本加载完成事件。
 * 当 `immediate` 为 `true`（默认值）时，脚本会立即开始加载。
 * 函数返回一个对象，包含已经加载的 `<script>` 标签引用、加载和卸载脚本的方法。
 *
 * @function createScriptTag
 * @param {string} src - 要加载的外部脚本的 URL 地址
 * @param {(el: HTMLScriptElement) => void} [onLoaded=noop] - 脚本加载完成后的回调函数，默认为空函数
 * @param {CreateScriptTagOptions} [options={}] - 创建 `<script>` 标签时的可选配置对象
 * @returns {CreateScriptTagReturn} - 包含了 scriptTag（HTMLScriptElement 或 null）、load 和 unload 方法的对象
 *
 * @example
 * ```javascript
 * import { createScriptTag } from './createScriptTag';
 *
 * const scriptOptions = {
 *   src: 'https://example.com/script.js',
 *   async: true,
 *   attrs: { id: 'myCustomScript' },
 * };
 *
 * const { load, unload } = createScriptTag(scriptOptions.src, loadedScript => {
 *   console.log('脚本加载完成:', loadedScript);
 * }, scriptOptions);
 *
 * load();
 * // ...
 * unload();
 * ```
 */
export function createScriptTag(
  src: string,
  onLoaded: (el: HTMLScriptElement) => void = noop,
  options: CreateScriptTagOptions = {}
) {
  const {
    immediate = true,
    type = 'text/javascript',
    async,
    crossOrigin,
    defer = true,
    document = defaultDocument,
    attrs = {},
  } = options

  let scriptTag: HTMLScriptElement | null = null

  let _promise: Promise<HTMLScriptElement | boolean> | null = null

  const loadScript = (
    waitForScriptLoad: boolean
  ): Promise<HTMLScriptElement | boolean> =>
    new Promise((resolve, reject) => {
      const resolveWithElement = (el: HTMLScriptElement) => {
        scriptTag = el
        resolve(el)
        return el
      }

      if (!document) {
        resolve(false)
        return
      }

      let shouldAppend = false

      let el = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

      if (!el) {
        el = document.createElement('script')
        el.type = type
        el.src = src
        el.defer = defer

        if (async) el.async = async
        if (crossOrigin) el.crossOrigin = crossOrigin

        Object.entries(attrs).forEach(([name, value]) =>
          el?.setAttribute(name, value)
        )

        shouldAppend = true
      } else if (el.hasAttribute('data-loaded')) {
        resolveWithElement(el)
      }

      el.addEventListener('error', (event) => reject(event))
      el.addEventListener('abort', (event) => reject(event))
      el.addEventListener('load', () => {
        el!.setAttribute('data-loaded', 'true')

        onLoaded(el!)
        resolveWithElement(el!)
      })

      if (shouldAppend) el = document.head.appendChild(el)

      if (!waitForScriptLoad) resolveWithElement(el)
    })

  const load = (
    waitForScriptLoad = true
  ): Promise<HTMLScriptElement | boolean> => {
    if (!_promise) _promise = loadScript(waitForScriptLoad)
    return _promise
  }

  const unload = () => {
    if (!document) return

    _promise = null

    if (scriptTag) scriptTag = null

    const el = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (el) document.head.removeChild(el)
  }

  if (immediate) load()

  return { scriptTag, load, unload }
}

/**
 * 定义 `createScriptTag` 函数返回值类型别名
 * @typedef CreateScriptTagReturn
 * @type {ReturnType<typeof createScriptTag>}
 */
export type CreateScriptTagReturn = ReturnType<typeof createScriptTag>
