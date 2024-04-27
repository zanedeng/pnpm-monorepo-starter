/**
 * @constant {string[]} hexList - 创建一个包含十六进制数字（0-F）字符串的数组，用于生成UUID时随机选择。
 */
const hexList: string[] = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}

/**
 * @function buildUUID
 * @description 生成一个格式化为32位的UUID字符串，采用8-4-4-4-12的分段格式，中间插入短横线('-')。
 * @returns {string} - 返回生成的UUID字符串，例如："123e4567-e89b-12d3-a456-426655440000"
 * @note UUID的生成基于随机选取的十六进制数，第9、14、19、24位插入短横线，第15位固定为'4'，第20位从hexList中随机选取一个特定值。
 */
export function buildUUID(): string {
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid.replace(/-/g, '')
}

let unique = 0
/**
 * @function buildShortUUID
 * @description 生成一个简化的短UUID字符串，结合时间戳、随机数和递增唯一标识符(unique)。
 * @param {string} [prefix = ''] - 可选的前缀字符串，默认为空字符串。
 * @returns {string} - 返回生成的短UUID字符串，格式为："prefix_random_unique_timestamp"，例如："my_prefix_1234567_unique_1654321234567"
 * @note 每次调用该函数时，unique计数器会递增，从而确保生成的短UUID具有一定的唯一性。
 */
export function buildShortUUID(prefix = ''): string {
  const time = Date.now()
  const random = Math.floor(Math.random() * 1000000000)
  unique++
  return `${prefix}_${random}${unique}${String(time)}`
}
