/**
 * 定义 RefType 泛型类型
 * @template T 泛型类型参数
 * @typedef {T | null} RefType<T>
 * @description RefType 泛型类型用于表示一个引用类型的值，它可以是类型 T 的实例，也可以是 null。
 * 在许多编程场景中，特别是在 React 或 Vue 中，引用类型的数据在初始化阶段可能还未赋值，这时它们的值可能是 null。
 * RefType<T> 类型主要为了确保在处理引用类型时能够正确地处理 null 值，提高代码健壮性。
 *
 * 示例：
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * let userRef: RefType<User>; // userRef 可能会持有 User 类型的实例，也可能为 null
 *
 * // 在数据加载完成之前，userRef 可能是 null
 * userRef = null;
 *
 * // 数据加载完成后，将 User 实例赋给 userRef
 * userRef = { id: 1, name: 'John Doe' };
 * ```
 */
export type RefType<T> = T | null
