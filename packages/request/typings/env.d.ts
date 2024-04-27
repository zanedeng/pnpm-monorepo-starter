/**
 * 任意类型的异步函数
 */
declare type AnyPromiseFunction<T> = (...arg: any[]) => PromiseLike<T>

/**
 * 任意类型的普通函数
 */
declare type AnyNormalFunction<T> = (...arg: any[]) => T

/**
 * 定义泛型函数类型 AnyFunction
 * @template T 泛型类型参数，表示函数的返回值类型
 * @typedef {function(...args: any[]): T} AnyFunction
 * @description AnyFunction 类型用于描述一个接受任意数量任意类型参数，并返回类型为 T 的函数。
 * 其中，...args: any[] 表示函数参数列表，可以接受任意数量和任意类型的参数。
 *
 * 示例：
 * ```typescript
 * // 声明一个 AnyFunction<string> 类型的函数
 * const myFunction: AnyFunction<string> = (name: string) => `${name} says hello!`;
 * console.log(myFunction('Alice')); // 输出 "Alice says hello!"
 * ```
 */
declare type AnyFunction<T> = AnyNormalFunction<T> | AnyPromiseFunction<T>
