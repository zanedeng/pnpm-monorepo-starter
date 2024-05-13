import { ref, watch } from 'vue'

import { isUndefined } from '@zkj/utils'

/**
 * @typedef Options
 * @property {HTMLElement=} target - 复制文本的目标元素，默认为document.body
 */
interface Options {
  target?: HTMLElement
}

/**
 * @function useCopyToClipboard
 * @description 创建一个Vue Composition API Hook，用于管理剪贴板复制功能的状态
 * @param {string=} initial - 初始化复制文本内容
 * @returns {{clipboardRef: Ref<string>, isSuccessRef: Ref<boolean>, copiedRef: Ref<boolean>}} - 包含复制文本内容、复制成功与否状态和是否已复制过标志的响应式对象
 */
export function useCopyToClipboard(initial?: string) {
  const clipboardRef = ref(initial || '')
  const isSuccessRef = ref(false)
  const copiedRef = ref(false)
  watch(
    clipboardRef,
    (str?: string) => {
      if (!isUndefined(str)) {
        copiedRef.value = true
        isSuccessRef.value = copyTextToClipboard(str)
      }
    },
    { immediate: !!initial, flush: 'sync' }
  )

  return { clipboardRef, isSuccessRef, copiedRef }
}

/**
 * @function writeTextToClipboard
 * @description 使用浏览器内置的navigator.clipboard.writeText异步方法将文本写入剪贴板
 * @param {string} initial - 要写入剪贴板的文本内容
 * @throws {Error} - 当写入剪贴板失败时抛出错误信息
 */
export async function writeTextToClipboard(initial: string) {
  try {
    await navigator.clipboard.writeText(initial)
  } catch (err: any) {
    throw new Error(err)
  }
}

/**
 * @function copyTextToClipboard
 * @description 使用原生DOM操作实现文本复制到剪贴板功能
 * @param {string} input - 要复制到剪贴板的文本
 * @param {Options=} options - 可选配置参数，包括目标元素
 * @returns {boolean} - 是否复制成功，true表示成功复制到剪贴板，false表示复制失败
 */
export function copyTextToClipboard(
  input: string,
  { target = document.body }: Options = {}
) {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement

  element.value = input

  element.setAttribute('readonly', '')
  ;(element.style as any).contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt'

  const selection = document.getSelection()
  let originalRange
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  target.append(element)
  element.select()

  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch (e: any) {
    throw new Error(e)
  }

  element.remove()

  if (originalRange && selection) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  if (previouslyFocusedElement) {
    ;(previouslyFocusedElement as HTMLElement).focus()
  }
  return isSuccess
}
