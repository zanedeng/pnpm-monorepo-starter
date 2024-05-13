/**
 * 定义 PromiseFn 泛型接口
 * @interface PromiseFn
 * @template T 泛型参数，表示函数的参数类型，默认为 any 类型
 * @template R 泛型参数，表示函数返回的 Promise 中的值类型，默认与参数类型相同
 * @property {...arg: T[]} 参数列表，表示函数可以接受任意数量的 T 类型参数
 * @returns {Promise<R>} 函数返回一个 Promise，Promise 解析后的值类型为 R
 *
 * @description
 * PromiseFn 泛型接口用于定义一个函数类型，它可以接受任意数量的任意类型（默认）参数，
 * 并返回一个 Promise，该 Promise 解析后得到的值为 R 类型（默认与参数类型相同）。
 *
 * 示例：
 * ```typescript
 * // 使用默认泛型参数
 * let asyncFn: PromiseFn;
 * asyncFn = async (...args: any[]) => {
 *   // 进行异步操作
 *   const result = await someAsyncOperation(args);
 *   return result;
 * };
 *
 * // 明确指定参数类型和返回的 Promise 中的值类型
 * let fetchUsersFn: PromiseFn<string[], User[]>;
 * fetchUsersFn = async (searchTerms: string[]) => {
 *   const response = await fetch(`https://api.example.com/users?search=${searchTerms.join(',')}`);
 *   const users = await response.json();
 *   return users;
 * };
 * ```
 */
export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}
