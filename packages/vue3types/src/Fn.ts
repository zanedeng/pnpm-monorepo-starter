/**
 * 定义 Fn 泛型接口
 * @interface Fn
 * @template T 泛型参数，表示函数的参数类型，默认为 any 类型
 * @template R 泛型参数，表示函数的返回类型，默认与参数类型相同
 * @property {...arg: T[]} 参数列表，表示函数可以接受任意数量的 T 类型参数
 * @returns {R} 函数的返回值类型为 R
 *
 * @description
 * Fn 泛型接口用于定义一个函数类型，它可以接受任意数量的任意类型（默认）参数，并返回任意类型（默认与参数类型相同）的值。
 * 这个接口可以根据实际情况传入具体的 T 和 R 类型参数来指定函数的参数类型和返回类型。
 *
 * 示例：
 * ```typescript
 * // 使用默认泛型参数
 * let myFn: Fn;
 * myFn = function (...args: any[]) {
 *   // 处理参数
 *   return 'any result';
 * };
 *
 * // 明确指定参数类型和返回类型
 * let sumFn: Fn<number, number>;
 * sumFn = function (...numbers: number[]) {
 *   return numbers.reduce((acc, curr) => acc + curr, 0);
 * };
 * ```
 */
export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
