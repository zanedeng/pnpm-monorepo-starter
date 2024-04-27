/**
 * 定义一个泛型函数 getDynamicProps，它接收两个泛型参数：
 * - T：表示传入的 props 参数的类型，要求它是一个对象类型，其属性可以是任意类型。
 * - U：表示返回的 props 的期望类型，它是一个 partial 类型，意味着返回的对象可能包含 U 的部分或全部属性。
 *
 * 函数的目的在于提取传入的 props 中各个属性的原始值，并将这些值组成一个新的对象返回。
 *
 * @param props - 输入的 props 对象，其类型为 T。
 * @returns 返回一个 Partial<U> 类型的对象，其中包含了从 props 提取出来的原始值。
 *
 * 注意：此函数目前假设了传入的 props 中每个属性都有一个名为 'value' 的字段来存储其实际值。
 * 如果 props 中的属性本身就是原始值，或者已经是 Ref 或 ComputedRef 类型，这种方式可能不会正确工作。
 * 正确的做法应该是根据 props 的确切类型来提取其值，例如使用 `unref` 函数来获得 Ref 类型的值。
 */
export function getDynamicProps<T extends Record<string, unknown>, U>(
  props: T
): Partial<U> {
  const ret: Record<string, unknown> = {}

  Object.keys(props).forEach((key) => {
    ret[key] = (props[key] as { value: unknown }).value
  })

  return ret as Partial<U>
}
