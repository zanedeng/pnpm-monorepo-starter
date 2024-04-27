import { trim } from '../string/trim'
import { hasClass } from './hasClass'

/**
 * 从元素中移除指定的类名
 * @function removeClass
 * @param {Element} el - 需要操作的HTML元素
 * @param {string} cls - 要从元素中移除的类名，多个类名之间以空格分隔
 * @returns {void}
 * 
 * @description
 * 此函数用于从给定的HTML元素`el`中移除指定的类名列表`cls`。如果`el`或`cls`为空，则函数不做任何操作。
 * 首先，将传入的类名字符串分割成数组，遍历数组并逐个检查和移除类名。
 * 对于支持`classList` API 的现代浏览器，直接使用`el.classList.remove(clsName)`方法移除类名。
 * 对于不支持`classList`的老旧浏览器，利用`hasClass`函数检查类名是否存在，存在则替换掉类名所在的部分字符串。

 * @example
 * ```typescript
 * const myElement = document.getElementById('myElement');
 * removeClass(myElement, 'class1 class2');
 * ```
 * 上述代码将从指定元素中移除 'class1' 和 'class2' 这两个类名。
 * 
 * @requires {function} trim - 用于删除字符串两端空白字符的函数
 * @requires {function} hasClass - 检查元素是否包含指定类名的函数
 */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return

  // 将类名字符串分割成数组
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  // 遍历类名数组，逐个处理类名
  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    // 如果浏览器支持classList API，直接使用该API移除类名
    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      // 对于不支持classList的浏览器，如果元素含有该类名，则替换掉该类名部分字符串
      curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }

  // 若浏览器不支持classList，更新元素的className属性
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
