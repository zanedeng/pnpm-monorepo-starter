import { isFunction } from './isFunction'
import { isObject } from './isObject'
/**
 * 用于判断传入的未知类型值 `val` 是否为 Promise 类型。
 * 这个泛型函数接受一个类型参数 T，用于指定 Promise 的 resolve 状态值的类型。
 * 它通过调用 `isObject` 和 `isFunction` 函数来验证 `val` 是否同时满足：
 * 1. 是一个对象
 * 2. 包含 then 方法且该方法为函数类型
 * 3. 包含 catch 方法且该方法也为函数类型
 * 若满足这些条件，则认为 `val` 是 Promise 类型，并返回 `true`，同时 TypeScript 类型系统会在此上下文中将 `val` 推断为 `Promise<T>` 类型；
 * 若不满足，则返回 `false`，同时 TypeScript 认为 `val` 不是 `Promise<T>` 类型。
 *
 * @function isPromise
 * @template T - 泛型参数，代表 Promise 的 resolve 状态值的类型。
 * @param {unknown} val - 需要检测类型的任意值。
 * @returns {val is Promise<T>} - 根据判断结果返回对应的布尔值及类型断言。
 *
 * @example
 * ```typescript
 * import { isPromise } from '@zkj/utils';
 *
 * const promiseValue: Promise<number> = Promise.resolve(42);
 * const notAPromiseValue: number = 42;
 *
 * if (isPromise(promiseValue)) {
 *   console.log('promiseValue is a Promise.');
 *   // 在此处，TypeScript会推断promiseValue为Promise<number>类型，可以安全地使用.then()和.catch()
 *   promiseValue.then((resolvedValue) => console.log(resolvedValue));
 * }
 *
 * if (!isPromise(notAPromiseValue)) {
 *   console.log('notAPromiseValue is not a Promise.');
 *   // 在此处，TypeScript知道notAPromiseValue不可能是Promise类型
 * }
 * ```
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch)
