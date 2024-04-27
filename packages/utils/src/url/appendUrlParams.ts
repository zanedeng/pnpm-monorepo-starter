/**
 * @function appendUrlParams
 * @description 该函数用于向基础URL追加URL查询参数。它接受一个基础URL字符串和一个对象，对象的键值对会被转化为查询参数，并附加到URL后面。
 * @param {string} baseUrl - 基础URL，即需要追加查询参数的目标URL。
 * @param {any} obj - 一个包含查询参数名和值的对象，所有的键值对都会被URL编码后添加到URL末尾。
 * @returns {string} 返回拼接了查询参数的新URL字符串。
 *
 * @example
 * ```typescript
 * const url = 'https://example.com/api';
 * const params = { key1: 'value1', key2: 'value2' };
 * const newUrl = appendUrlParams(url, params);
 * console.log(newUrl); // 输出: "https://example.com/api?key1=value1&key2=value2"
 * ```
 */
export function appendUrlParams(baseUrl: string, obj: any): string {
  // 初始化参数字符串
  let parameters = ''

  // 遍历对象，将键值对转化为URL查询参数格式
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`
  }
  // 删除最后一个"&"字符
  parameters = parameters.replace(/&$/, '')

  // 根据基础URL是否已包含 "?" 或 "/" 来确定参数拼接位置
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters // 如果URL已包含 "?", 直接在后面拼接参数
    : baseUrl.replace(/\/?$/, '?') + parameters // 否则在末尾添加 "?" 并拼接参数
}
