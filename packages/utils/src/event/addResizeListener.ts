import ResizeObserver from 'resize-observer-polyfill'
import { isServer } from '../verify'

function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn: () => any) => {
        fn()
      })
    }
  }
}

export function addResizeListener(element: any, fn: () => any) {
  if (isServer) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}
