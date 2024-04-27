import { getBoundingClientRect } from './getBoundingClientRect'

/**
 * 视口偏移量结果接口
 * @interface ViewportOffsetResult
 */
export interface ViewportOffsetResult {
  /**
   * 元素左边缘距离视口左边缘的偏移量（单位：像素）
   * @member {number} left
   */
  left: number
  /**
   * 元素顶部边缘距离视口顶部的偏移量（单位：像素）
   * @member {number} top
   */
  top: number
  /**
   * 视口右边缘距离元素右边缘的偏移量（不包括 body 滚动区域，单位：像素）
   * @member {number} right
   */
  right: number
  /**
   * 视口底部边缘距离元素底部边缘的偏移量（不包括 body 滚动区域，单位：像素）
   * @member {number} bottom
   */
  bottom: number
  /**
   * 视口右边缘距离元素右边缘的偏移量（包括 body 滚动区域，单位：像素）
   * @member {number} rightIncludeBody
   */
  rightIncludeBody: number
  /**
   * 视口底部边缘距离元素底部边缘的偏移量（包括 body 滚动区域，单位：像素）
   * @member {number} bottomIncludeBody
   */
  bottomIncludeBody: number
}

/**
 * 获取指定DOM元素相对于浏览器视窗的偏移量信息
 * @function getViewportOffset
 * @param {Element} element - 需要计算偏移量的DOM元素
 * @returns {ViewportOffsetResult} - 返回一个包含元素左偏移、顶部偏移及其相对视窗左右边界的距离（包括/不包括body滚动区域）的对象
 *
 * @description
 * 此函数首先获取DOM元素的边界信息，然后结合当前视窗的滚动位置和视窗尺寸计算出元素相对于视窗各边界的偏移量。
 *
 * @example
 * ```javascript
 * const myElement = document.getElementById('my-element');
 * const viewportOffset = getViewportOffset(myElement);
 * console.log(viewportOffset.left, viewportOffset.top, viewportOffset.right, viewportOffset.bottom);
 * ```
 *
 * @typedef ViewportOffsetResult
 * @property {number} left - 元素左侧边缘至视窗左侧的距离
 * @property {number} top - 元素顶部边缘至视窗顶部的距离
 * @property {number} right - 视窗右侧边缘至元素右侧边缘的距离（不包括body滚动区域）
 * @property {number} bottom - 视窗底部边缘至元素底部边缘的距离（不包括body滚动区域）
 * @property {number} rightIncludeBody - 视窗右侧边缘至元素右侧边缘的距离（包括body滚动区域）
 * @property {number} bottomIncludeBody - 视窗底部边缘至元素底部边缘的距离（包括body滚动区域）
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement
  // 获取相关滚动和client位置信息
  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop

  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset

  // 获取元素边界信息
  const box = getBoundingClientRect(element)

  const {
    left: retLeft,
    top: rectTop,
    width: rectWidth,
    height: rectHeight,
  } = box as DOMRect

  // 计算滚动偏移量
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)

  // 计算元素相对于视窗的绝对偏移量
  const offsetLeft = retLeft + pageXOffset
  const offsetTop = rectTop + pageYOffset

  // 计算元素相对于视窗的偏移量（减去滚动偏移量）
  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop

  // 获取视窗尺寸
  const clientWidth = window.document.documentElement.clientWidth
  const clientHeight = window.document.documentElement.clientHeight

  // 计算元素相对于视窗各边界的距离
  return {
    left,
    top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  }
}
