import dayjs from 'dayjs'

const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 格式化日期为指定格式字符串
 * @module formatToDate
 * @param {dayjs.ConfigType} date - 需要格式化的日期，可以是 Date 对象、Unix 时间戳、ISO 8601 字符串或其他 dayjs 支持的日期格式
 * @param {string=} format - 期望输出的日期格式，默认为 "YYYY-MM-DD"
 * @returns {string} - 格式化后符合指定格式的日期字符串
 *
 * @description
 * 此函数使用 dayjs 库对输入的日期进行格式化处理，将其转换为指定格式的字符串。
 * 若未提供日期参数，则默认格式化当前日期。
 * 若未提供格式参数，则默认按照 "YYYY-MM-DD" 格式输出。
 *
 * @example
 * ```javascript
 * import { formatToDate } from '@zkj/utils';
 *
 * const todayFormatted = formatToDate(); // 默认格式化当前日期为 "YYYY-MM-DD"
 * const customDateFormatted = formatToDate(new Date('2023-01-01'), 'MM/DD/YYYY'); // 输出 "01/01/2023"
 * ```
 */
export function formatToDate(
  date?: dayjs.ConfigType,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format)
}
