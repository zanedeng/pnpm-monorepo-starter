import { isFunction } from '@zkj/utils'
import type { App, Component, Slots } from 'vue'

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}

export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export type CustomComponent = Component & { displayName?: string }

export const withInstall = <T extends CustomComponent>(
  component: T,
  alias?: string
) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as WithInstall<T>
}

type RenderOpts = {
  disabled: boolean
  [key: string]: any
}

export function getSlot(
  slots: Slots,
  slot = 'default',
  data?: any,
  opts?: RenderOpts
) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  const params = { ...data, ...opts }
  return slotFn(params)
}

export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots)
  const ret: any = {}
  slotKeys.forEach((key) => {
    if (excludeKeys.includes(key)) {
      return null
    }
    ret[key] = (data?: any) => getSlot(slots, key, data)
  })
  return ret
}

export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}
