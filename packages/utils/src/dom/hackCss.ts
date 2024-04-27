/**
 * 添加CSS Hack样式
 * @function hackCss
 * @param {string} attr - 需要添加hack前缀的CSS属性名，如 transition 或 transform
 * @param {string} value - 相应CSS属性的值
 * @returns {Record<string, string>} - 返回一个对象，包含原属性名及所有带浏览器引擎前缀的属性名与其对应的值

 * @description
 * 此函数接收一个CSS属性名和对应值，生成一个包含原属性名以及其他常见浏览器引擎前缀属性名的对象，
 * 以便于一次性设置带有CSS hack的样式，确保在多种浏览器下兼容性更好。

 * @example
 * ```typescript
 * const styles = hackCss('transform', 'rotate(45deg)');
 * element.style = styles;
 * ```
 */
export function hackCss(attr: string, value: string) {
  const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT'] // 常见CSS引擎前缀数组
  attr = attr.charAt(0).toUpperCase() + attr.slice(1) // 将属性名首字母转大写以符合CSS规范

  // 创建一个对象用来存储带前缀的属性和值
  const styleObj: any = {}
  prefix.forEach((item) => {
    styleObj[`${item}${attr}`] = value // 给每个前缀加上属性名并赋值
  })

  // 返回包含所有属性名与值的对象
  return {
    ...styleObj,
    // 同时添加原始属性名及其值
    [attr]: value,
  }
}
