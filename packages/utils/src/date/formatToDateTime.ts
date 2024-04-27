import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * 格式化日期时间至指定格式字符串
 * @module formatToDateTime
 * @param {dayjs.ConfigType=} date - 需要格式化的日期时间对象，可以是 Date 对象、Unix 时间戳、ISO 8601 字符串或者其他 dayjs 支持的日期时间格式
 * @param {string=} format - 期望输出的日期时间格式，默认为 "YYYY-MM-DD HH:mm:ss"
 * @returns {string} - 格式化后符合指定格式的日期时间字符串
 *
 * @description
 * 此函数使用 dayjs 库对输入的日期时间进行格式化处理，将其转换为指定格式的字符串。
 * 若未提供日期时间参数，则默认格式化当前日期时间。
 * 若未提供格式参数，则默认按照 "YYYY-MM-DD HH:mm:ss" 格式输出。
 *
 * @example
 * ```javascript
 * import { formatToDateTime } from '@zkj/utils';
 *
 * const nowFormatted = formatToDateTime(); // 默认格式化当前日期时间为 "YYYY-MM-DD HH:mm:ss"
 * const customDateTimeFormatted = formatToDateTime(new Date(), 'MM/DD/YYYY h:mm A'); // 输出类似 "01/01/2023 12:00 PM"
 * ```
 */
export function formatToDateTime(
  date?: dayjs.ConfigType,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format)
}
