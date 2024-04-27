import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es'
import { isArray, isObject } from '../verify'
/**
 * 深度合并两个对象或数组，并根据指定策略处理数组内容
 * @function deepMerge
 * @template T - 输入源对象类型
 * @template U - 输入目标对象类型
 * @param {T} source - 源对象或数组
 * @param {U} target - 目标对象或数组
 * @param {'union'|'intersection'|'concat'|'replace'} [mergeArrays='replace'] - 数组合并策略，默认为 'replace'，可选值包括：
 *   - 'union': 使用lodash的unionWith函数合并数组，去除重复项
 *   - 'intersection': 使用lodash的intersectionWith函数合并数组，保留交集部分
 *   - 'concat': 数组简单拼接
 *   - 'replace': 使用目标数组替换源数组
 * @returns {T & U} - 返回合并后的对象，同时包含源对象和目标对象的所有属性和数组元素
 *
 * @example
 * ```typescript
 * import { deepMerge } from '@zkj/utils';
 *
 * const source = { a: 1, b: { c: 2 }, d: [3, 4] };
 * const target = { b: { e: 5 }, d: [6, 7], f: 8 };
 * const merged = deepMerge(source, target, 'union');
 *
 * console.log(merged);
 * // 输出: { a: 1, b: { c: 2, e: 5 }, d: [3, 4, 6, 7], f: 8 }
 * ```
 *
 * @description
 * 此函数用于深度合并两个对象或数组，当遇到相同的属性时，若属性值均为对象，则递归合并；
 * 若属性值均为数组，则根据传入的 `mergeArrays` 参数决定如何合并数组内容。
 * 如果其中一个输入参数为null或undefined，则返回另一个参数。
 */
export function deepMerge<
  T extends object | null | undefined,
  U extends object | null | undefined
>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace'
): T & U {
  if (!target) {
    return source as T & U
  }
  if (!source) {
    return target as T & U
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual)
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual)
        case 'concat':
          return sourceValue.concat(targetValue)
        case 'replace':
          return targetValue
        default:
          throw new Error(
            `Unknown merge array strategy: ${mergeArrays as string}`
          )
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays)
    }
    return undefined
  })
}
