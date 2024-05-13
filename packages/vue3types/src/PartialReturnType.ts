/**
 * 定义 PartialReturnType 泛型类型
 * @template T 扩展自函数类型，该函数接受任意数量未知类型的参数并返回未知类型的值
 * @typedef {Partial<ReturnType<T>>} PartialReturnType<T>
 * @description PartialReturnType 类型表示从一个函数类型 T 的返回值类型中创建出一个部分可选类型。
 * 如果函数 T 返回的对象类型拥有某些属性，那么 PartialReturnType<T> 将会保留那些属性，但将它们标记为可选。
 *
 * 示例：
 * 假设有如下函数：
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * function createDummyUser(): User {
 *   return {
 *     id: 1,
 *     name: 'John Doe',
 *     email: 'john.doe@example.com'
 *   };
 * }
 * ```
 * 那么，`PartialReturnType<typeof createDummyUser>` 类型将会是：
 * ```typescript
 * {
 *   id?: number;
 *   name?: string;
 *   email?: string;
 * }
 * ```
 * 这意味着所有属性都是可选的。
 */
export type PartialReturnType<T extends (...args: unknown[]) => unknown> =
  Partial<ReturnType<T>>
