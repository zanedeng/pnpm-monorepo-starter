/**
 * 定义 Nullable 泛型类型
 * @template T 泛型类型参数，表示原始类型
 * @typedef {T | null} Nullable<T>
 * @description Nullable 类型用于表示一个可能是原始类型 T 或者 null 的联合类型。
 * 也就是说，Nullable<T> 类型的变量可以是 T 类型的值，也可以是 null。
 *
 * 示例：
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * let user: Nullable<User>; // user 变量现在可以是 User 类型的实例，也可以是 null
 * user = { id: 1, name: 'Tom' }; // 正确
 * user = null; // 正确
 * ```
 */
export type Nullable<T> = T | null
