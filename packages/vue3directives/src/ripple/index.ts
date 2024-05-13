import type { Recordable } from '@zkj/vue3types'
import type { Directive } from 'vue'
import './index.scss'

/**
 * 定义Ripple指令相关的选项类型
 * @interface RippleOptions
 * @property {string} event - 触发波纹效果的事件名称，默认为'mousedown'
 * @property {number} transition - 波纹过渡动画的时间（毫秒）
 */
export interface RippleOptions {
  event: string
  transition: number
}

/**
 * 定义Ripple指令原型接口，用于扩展指令属性
 * @interface RippleProto
 * @property {string | undefined} background - 波纹颜色背景，默认为空
 * @property {string | undefined} zIndex - 波纹层叠顺序，默认为空
 */
export interface RippleProto {
  background?: string
  zIndex?: string
}

/**
 * 自定义事件类型，同时支持Mouse和Touch事件
 * @typedef {Event & MouseEvent & TouchEvent} EventType
 */
export type EventType = Event & MouseEvent & TouchEvent

/**
 * 初始化Ripple指令默认选项
 * @constant {RippleOptions} options
 */
const options: RippleOptions = {
  event: 'mousedown',
  transition: 400,
}

/**
 * 创建Ripple指令实现，它会监听特定事件并在元素上生成波纹效果
 * @implements {Directive & RippleProto}
 * @name rippleDirective
 * @property {Function} beforeMount - 指令挂载阶段，设置事件监听器并初始化波纹效果
 * @property {Function} updated - 指令更新阶段，根据指令新的绑定值更新或清除波纹效果
 */
const rippleDirective: Directive & RippleProto = {
  beforeMount: (el: HTMLElement, binding) => {
    if (binding.value === false) return

    const bg = el.getAttribute('ripple-background')
    setProps(Object.keys(binding.modifiers), options)

    const background = bg || rippleDirective.background
    const zIndex = rippleDirective.zIndex

    el.addEventListener(options.event, (event: Event) => {
      rippler({
        event: event as EventType,
        el,
        background,
        zIndex,
      })
    })
  },
  updated(el, binding) {
    if (!binding.value) {
      el?.clearRipple?.()
      return
    }
    const bg = el.getAttribute('ripple-background')
    el?.setBackground?.(bg)
  },
}

/**
 * 核心波纹效果函数，负责创建和动画化波纹元素
 * @function rippler
 * @param {EventType} event - 触发波纹效果的事件对象
 * @param {HTMLElement} el - 波纹效果应用的目标元素
 * @param {string | undefined} zIndex - 波纹层叠顺序
 * @param {string | undefined} background - 波纹颜色背景
 */
function rippler({
  event,
  el,
  zIndex,
  background,
}: { event: EventType; el: HTMLElement } & RippleProto) {
  const targetBorder = parseInt(
    getComputedStyle(el).borderWidth.replace('px', '')
  )
  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY

  const rect = el.getBoundingClientRect()
  const { left, top } = rect
  const { offsetWidth: width, offsetHeight: height } = el
  const { transition } = options
  const dx = clientX - left
  const dy = clientY - top
  const maxX = Math.max(dx, width - dx)
  const maxY = Math.max(dy, height - dy)
  const style = window.getComputedStyle(el)
  const radius = Math.sqrt(maxX * maxX + maxY * maxY)
  const border = targetBorder > 0 ? targetBorder : 0

  const ripple = document.createElement('div')
  const rippleContainer = document.createElement('div')

  // Styles for ripple
  ripple.className = 'ripple'

  Object.assign(ripple.style ?? {}, {
    marginTop: '0px',
    marginLeft: '0px',
    width: '1px',
    height: '1px',
    transition: `all ${transition}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    borderRadius: '50%',
    pointerEvents: 'none',
    position: 'relative',
    zIndex: zIndex ?? '9999',
    backgroundColor: background ?? 'rgba(0, 0, 0, 0.12)',
  })

  // Styles for rippleContainer
  rippleContainer.className = 'ripple-container'
  Object.assign(rippleContainer.style ?? {}, {
    position: 'absolute',
    left: `${0 - border}px`,
    top: `${0 - border}px`,
    height: '0',
    width: '0',
    pointerEvents: 'none',
    overflow: 'hidden',
  })

  const storedTargetPosition =
    el.style.position.length > 0
      ? el.style.position
      : getComputedStyle(el).position

  if (storedTargetPosition !== 'relative') {
    el.style.position = 'relative'
  }

  rippleContainer.appendChild(ripple)
  el.appendChild(rippleContainer)

  Object.assign(ripple.style, {
    marginTop: `${dy}px`,
    marginLeft: `${dx}px`,
  })

  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = style

  Object.assign(rippleContainer.style, {
    width: `${width}px`,
    height: `${height}px`,
    direction: 'ltr',
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  })

  setTimeout(() => {
    const wh = `${radius * 2}px`
    Object.assign(ripple.style ?? {}, {
      width: wh,
      height: wh,
      marginLeft: `${dx - radius}px`,
      marginTop: `${dy - radius}px`,
    })
  }, 0)

  function clearRipple() {
    setTimeout(() => {
      ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    }, 250)

    setTimeout(() => {
      rippleContainer?.parentNode?.removeChild(rippleContainer)
    }, 850)
    el.removeEventListener('mouseup', clearRipple, false)
    el.removeEventListener('mouseleave', clearRipple, false)
    el.removeEventListener('dragstart', clearRipple, false)
    setTimeout(() => {
      let clearPosition = true
      for (let i = 0; i < el.childNodes.length; i++) {
        if ((el.childNodes[i] as Recordable).className === 'ripple-container') {
          clearPosition = false
        }
      }

      if (clearPosition) {
        el.style.position =
          storedTargetPosition !== 'static' ? storedTargetPosition : ''
      }
    }, options.transition + 260)
  }

  if (event.type === 'mousedown') {
    el.addEventListener('mouseup', clearRipple, false)
    el.addEventListener('mouseleave', clearRipple, false)
    el.addEventListener('dragstart', clearRipple, false)
  } else {
    clearRipple()
  }

  ;(el as Recordable).setBackground = (bgColor: string) => {
    if (!bgColor) {
      return
    }
    ripple.style.backgroundColor = bgColor
  }
}

/**
 * 设置指令的modifiers作为options属性值
 * @function setProps
 * @param {Recordable} modifiers - 指令修饰符集合
 * @param {Recordable} props - 目标属性集合，这里指RippleOptions
 */
function setProps(modifiers: Recordable, props: Recordable) {
  modifiers.forEach((item: Recordable) => {
    if (isNaN(Number(item))) props.event = item
    else props.transition = item
  })
}

export { rippleDirective }
