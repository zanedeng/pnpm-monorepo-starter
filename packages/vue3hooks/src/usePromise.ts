import { effectScope, ref, shallowRef, unref, watch } from 'vue'
import { containsProp, tryOnBeforeUnmount, useDebounceFn } from '@vueuse/core'
import { isEqual } from '@zkj/utils'
import type { Ref, ShallowRef, UnwrapRef } from 'vue'

/**
 * 使用Promise的配置接口
 * @interface UsePromiseConfig
 * @property {boolean} [immediate=true] - 是否立即执行
 * @property {boolean} [redo=false] - 参数变化时是否重新执行
 * @property {number} [debounce=0] - 延迟执行的时间间隔（毫秒）
 * @property {boolean} [ignoreLoading=false] - 是否忽略加载状态检查
 * @property {boolean} [throwOnFailed=false] - 在Promise失败时是否抛出错误
 */
export interface UsePromiseConfig {
  immediate?: boolean
  redo?: boolean
  debounce?: number
  ignoreLoading?: boolean
  throwOnFailed?: boolean
}

/**
 * 使用Promise返回值类型接口
 * @interface UsePromiseReturnType<T>
 * @property {ShallowRef<T | null>} data - 引用Promise的结果
 * @property {Ref<UnwrapRef<boolean>>} loading - 加载状态引用
 * @property {() => Promise<T | null>} handleFn - 执行Promise的函数
 * @property {ShallowRef<unknown>} error - 引用Promise执行错误信息
 * @property {Ref<UnwrapRef<boolean>>} finished - 引用表示Promise是否执行完成的状态
 */
export interface UsePromiseReturnType<T> {
  data: ShallowRef<T | null>
  loading: Ref<UnwrapRef<boolean>>
  handleFn: () => Promise<T | null>
  error: ShallowRef<unknown>
  finished: Ref<UnwrapRef<boolean>>
}

/**
 * 判断对象是否符合UsePromiseConfig类型
 * @function isUsePromiseConfig
 * @param {object} obj - 待检测的对象
 * @returns {boolean} - 如果对象满足UsePromiseConfig，则返回true
 */
function isUsePromiseConfig(obj: object): obj is UsePromiseConfig {
  return containsProp(
    obj,
    'immediate',
    'redo',
    'debounce',
    'ignoreLoading',
    'throwOnFailed'
  )
}

/**
 * 用于管理和执行异步函数，并自动管理其数据状态（data）、加载状态（loading）、完成状态（finished）和错误信息（error）。
 * 此函数提供了多个重载版本，可以根据不同场景使用。
 * @function usePromise
 * @generic T 泛型类型，代表异步函数的返回值类型，默认为any
 * @param {(...args: any[]) => Promise<T>} fn - 需要管理的异步函数，接收任意数量和类型的参数，并返回一个Promise。
 *
 * @returns {UsePromiseReturnType<T>} - 返回一个包含了异步函数执行结果状态的对象。
 */
export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>
): UsePromiseReturnType<T>

/**
 * @function usePromise
 * @param {(...args: any[]) => Promise<T>} fn - 需要管理的异步函数，接收任意数量和类型的参数，并返回一个Promise。
 * @param {UsePromiseConfig} config - 用于配置异步函数执行的行为选项，如是否立即执行、是否在参数变化时重新执行等。
 * @returns {UsePromiseReturnType<T>} - 返回包含了异步函数执行结果状态的对象。
 */
export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>,
  config: UsePromiseConfig
): UsePromiseReturnType<T>

/**
 * @function usePromise
 * @param {(...args: any[]) => Promise<T>} fn - 需要管理的异步函数，接收任意数量和类型的参数，并返回一个Promise。
 * @param {unknown} fnArgs - 传递给异步函数的具体参数值，可以是任何类型。
 * @param {UsePromiseConfig} config - 用于配置异步函数执行的行为选项，如是否立即执行、是否在参数变化时重新执行等。
 * @returns {UsePromiseReturnType<T>} - 返回包含了异步函数执行结果状态的对象。
 */
export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>,
  fnArgs: unknown,
  config?: UsePromiseConfig
): UsePromiseReturnType<T>

/**
 * @function usePromise
 * @param {(...args: any[]) => Promise<T>} fn - 需要管理的异步函数，接收任意数量和类型的参数，并返回一个Promise。
 * @param {...any[]} args - 通过剩余参数来支持多种调用方式，允许先传入异步函数参数再传入配置对象，或者反之。
 * @returns {UsePromiseReturnType<T>} - 返回包含了异步函数执行结果状态的对象。
 * @example
 * ```typescript
 * // 基本使用
 * const fetchData = async (id: string) => {...};
 * const { data, loading, finished, error, handleFn } = usePromise(fetchData, 'someId');
 *
 * // 使用配置
 * const getConfiguredPromise = async (searchText: string) => {...};
 * const config: UsePromiseConfig = { immediate: false, debounce: 500 };
 * const { data, loading, finished, error, handleFn } = usePromise(getConfiguredPromise, 'searchText', config);
 * ```
 */
export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>,
  ...args: any[]
): UsePromiseReturnType<T> {
  /**
   * 保存异步函数执行结果的浅层引用，初始值为null。
   * @property {ShallowRef<T | null>} data
   */
  const data = shallowRef<T | null>(null)

  /**
   * 保存异步函数加载状态的引用，初始值为false。
   * @property {Ref<UnwrapRef<boolean>>} loading
   */
  const loading = ref(false)

  /**
   * 保存异步函数是否已完成执行的引用，初始值为false。
   * @property {Ref<UnwrapRef<boolean>>} finished
   */
  const finished = ref(false)

  /**
   * 保存异步函数执行错误信息的浅层引用，初始值为null。
   * @property {ShallowRef<unknown>} error
   */
  const error = shallowRef<unknown>(null)

  const fnArgs = ref<unknown>()

  let config: UsePromiseConfig = {
    immediate: true,
    redo: false,
    debounce: 0,
    ignoreLoading: false,
    throwOnFailed: false,
  }

  /**
   * 执行异步函数并更新状态的方法。
   * @returns {() => Promise<T | null>}
   */
  function handleFn(): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const { ignoreLoading, throwOnFailed } = config
      if (!ignoreLoading && loading.value) {
        return
      }
      loading.value = true
      finished.value = false
      fn.call(undefined, unref(fnArgs))
        .then((res) => {
          data.value = res
          error.value = null
          return resolve(res)
        })
        .catch((e) => {
          data.value = null
          error.value = e
          if (throwOnFailed) {
            return reject(e)
          }
          return resolve(null)
        })
        .finally(() => {
          loading.value = false
          finished.value = true
        })
    })
  }

  const scoped = effectScope()

  scoped.run(() => {
    if (args.length > 0) {
      if (isUsePromiseConfig(args[0])) config = { ...config, ...args[0] }
      else fnArgs.value = args[0]
    }

    if (args.length > 1) {
      if (isUsePromiseConfig(args[1])) config = { ...config, ...args[1] }
    }

    const { debounce, immediate, redo } = config
    const debounceFn = useDebounceFn(() => {
      return handleFn()
    }, debounce)

    if (immediate) {
      debounceFn().then()
    }

    if (redo) {
      watch(
        fnArgs,
        (newArgs, oldArgs) => {
          if (!isEqual(newArgs, oldArgs)) {
            debounceFn().then()
          }
        },
        { deep: true }
      )
    }
  })

  tryOnBeforeUnmount(() => {
    scoped.stop()
  })

  return {
    data,
    loading,
    finished,
    error,
    handleFn,
  }
}
