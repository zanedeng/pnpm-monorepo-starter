/**
 * 定义 DeepPartial 泛型类型
 * @template T 泛型类型参数
 * @typedef {Object} DeepPartial<T>
 * @property {keyof T} P - 泛型 T 中的任意属性键
 * @property {DeepPartial<T[P]>} [P] - 对于 T 中的每个属性 P，其值为 DeepPartial<T[P]> 类型
 * @description
 * DeepPartial<T> 类型用于创建一个深度可选的对象类型，即将 T 类型中所有的属性全部变为可选，并且如果属性值本身还是对象类型，则递归地将其属性也变为深度可选。
 * 通过这种方式，DeepPartial<T> 类型的实例可以完全或者部分地缺少 T 类型中定义的任意层次的属性。
 *
 * 示例：
 * ```typescript
 * interface User {
 *   name: string;
 *   address: {
 *     street: string;
 *     city: string;
 *   };
 * }
 *
 * let partialUser: DeepPartial<User> = {};
 * partialUser = {
 *   name: 'Alice',
 *   address: {
 *     street: '123 Main St',
 *   }
 * };
 * partialUser = {
 *   name: 'Bob',
 *   address: null,
 * };
 * ```
 * 在以上示例中，DeepPartial<User> 类型允许我们创建一个用户对象的可选属性版本，其中任何一个属性都可以是 undefined 或 null，或者是一个同样属性为可选的嵌套对象。
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
