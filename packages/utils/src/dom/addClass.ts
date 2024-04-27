import { hasClass } from './hasClass'

/**
 * 向指定DOM元素添加类名
 * @function addClass
 * @param {Element} el - 要添加类名的目标DOM元素
 * @param {string} cls - 要添加的类名，支持传入多个类名，各类名间由空格分隔
 *
 * @example
 * ```typescript
 * import { addClass, hasClass } from '@zkj/utils';
 *
 * const myElement = document.getElementById('myDivElement') as Element;
 *
 * // 确保元素存在
 * if (myElement) {
 *   addClass(myElement, 'classA classB');
 *
 *   // 验证类名已成功添加
 *   console.assert(hasClass(myElement, 'classA'), 'classA 应该已被添加');
 *   console.assert(hasClass(myElement, 'classB'), 'classB 应该已被添加');
 * }
 * ```
 *
 * @description
 * 此函数用于向指定的DOM元素添加一个或多个类名。若目标元素的classList API可用，则直接使用classList.add方法添加类名；
 * 若classList不可用，则通过字符串拼接的方式手动添加类名，并确保不会添加重复的类名。
 */
export function addClass(el: Element, cls: string) {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}
