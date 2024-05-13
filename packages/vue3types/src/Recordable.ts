/**
 * 定义 Recordable 泛型类型
 * @template T 泛型类型参数，默认为 any 类型
 * @typedef {Record<string, T>} Recordable<T>
 * @description Recordable 类型用来定义一个索引签名，其键是字符串类型，值是泛型类型 T。
 * 它本质上是一个对象类型，其中的每个属性都是键值对，键为字符串，值为泛型 T 指定的类型。
 * 默认情况下，泛型 T 设置为 any，表示对象的属性值可以是任意类型。

 * 示例：
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 * 
 * let personData: Recordable<Person> = {
 *   'person1': { name: 'Alice', age: 25 },
 *   'person2': { name: 'Bob', age: 30 }
 * };
 * ```
 * 上述示例中，`Recordable<Person>` 表示一个对象，其属性名是字符串类型，属性值是 Person 类型。
 */
export type Recordable<T = any> = Record<string, T>
