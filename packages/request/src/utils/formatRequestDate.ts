import { isObject, isString } from '@zkj/utils'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * @function formatRequestDate
 * @description 格式化请求参数中的日期字段，如果存在格式化函数则调用该函数，同时处理字符串类型的参数去除前后空格。
 * @param {Record<string, unknown>} params - 待处理的请求参数对象，其中可包含日期或其他需要格式化的字段。
 * @returns {void} 无返回值，直接修改传入的params对象。
 */
export const formatRequestDate = (params: Record<string, unknown>) => {
  if (!isObject(params)) {
    return
  }

  // 遍历params对象的所有属性
  for (const key in params) {
    // 检查当前属性是否有format属性且是函数类型
    const format = (params[key] as any)?.format ?? null
    if (format && typeof format === 'function') {
      // 若存在format函数，则调用它并将结果赋值回params[key]
      params[key] = format(DATE_TIME_FORMAT)
    }

    // 如果key是字符串类型
    if (isString(key)) {
      const value = params[key] as any
      if (value) {
        // 尝试去除字符串类型的value值的前后空格
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    // 如果当前属性值还是对象类型，则递归处理
    if (isObject(params[key])) {
      formatRequestDate(params[key] as any)
    }
  }
}
