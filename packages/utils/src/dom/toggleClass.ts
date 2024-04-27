/**
 * @function toggleClass
 * @description 根据传入的布尔值动态地在目标元素上添加或移除指定的CSS类名
 * @param {boolean} flag - 控制开关，为true时添加类名，为false时移除类名
 * @param {string} clsName - 需要添加或移除的CSS类名
 * @param {HTMLElement=} target - 需要操作的目标DOM元素，默认为document.body
 * @returns {void} - 无返回值，直接修改目标元素的class属性
 *
 * 此函数首先获取目标元素，若未传入target参数，则默认为目标为整个文档的body元素。
 * 然后获取目标元素原有的class属性值，并从中移除指定的clsName类名。
 * 最后根据传入的flag参数决定是否添加clsName类名到目标元素的class属性中，
 * 并确保最终class属性值去除前后空白字符。
 */
export function toggleClass(
  flag: boolean,
  clsName: string,
  target?: HTMLElement
) {
  const targetEl = target || document.body
  let { className } = targetEl
  className = className.replace(clsName, '')
  targetEl.className = (flag ? `${className} ${clsName} ` : className).trim()
}
