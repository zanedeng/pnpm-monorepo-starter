import { readonly as defineReadonly, inject, provide, reactive } from 'vue'
import type { InjectionKey, UnwrapRef } from 'vue'

/**
 * 创建上下文选项接口
 * @interface CreateContextOptions
 * @property {boolean} [readonly] - 是否使上下文状态为只读，默认为true
 * @property {boolean} [createProvider] - 是否创建提供者，默认为false
 * @property {boolean} [native] - 是否以原生方式提供上下文，默认为false
 */
export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

/**
 * 类型定义：浅层解包类型
 * 将T中所有属性转换为UnwrapRef类型
 * @typedef {Object.<string, UnwrapRef<T[P]>>} ShallowUnwrap<T>
 * @template T - 原始类型对象
 * @template P - T对象的属性名
 */
type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

/**
 * 创建并提供上下文
 * @function createContext
 * @template T - 上下文数据类型
 * @param {any} context - 需要封装成上下文的数据
 * @param {InjectionKey<T>} [key=Symbol()] - 注入键，默认为一个Symbol值
 * @param {CreateContextOptions} [options={}] - 创建选项
 * @returns {{ state: T }} - 返回包含state的对象，state是上下文的状态（可能是只读的）
 */
export const createContext = <T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) => {
  // 解构选项参数
  const { readonly = true, createProvider = false, native = false } = options

  // 创建响应式状态
  const state = reactive(context)

  // 根据readonly选项决定提供的是只读代理还是原始响应式状态
  const provideData = readonly ? defineReadonly(state) : state

  // 提供上下文数据到组件树，根据createProvider和native选项确定提供方式
  !createProvider && provide(key, native ? context : provideData)

  return { state }
}

/**
 * 使用上下文
 * @function useContext
 * @template T - 上下文数据类型
 * @param {InjectionKey<T>} key - 注入键
 * @param {boolean} [native] - 是否以原生方式使用上下文（重载1）
 * @returns {T} - 返回上下文数据
 */
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T

/**
 * @function useContext
 * @template T - 上下文数据类型
 * @param {InjectionKey<T>} key - 注入键
 * @param {any} [defaultValue] - 当找不到上下文时的默认值（重载2）
 * @param {boolean} [native] - 是否以原生方式使用上下文
 * @returns {T} - 返回上下文数据
 */
export function useContext<T>(
  key: InjectionKey<T>,
  defaultValue?: any,
  native?: boolean
): T

/**
 * @function useContext
 * @template T - 上下文数据类型
 * @param {InjectionKey<T>} [key=Symbol()] - 注入键，默认为一个Symbol值
 * @param {any} [defaultValue] - 当找不到上下文时的默认值
 * @returns {ShallowUnwrap<T>} - 返回解包后的上下文数据（浅层解包）
 */
export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
