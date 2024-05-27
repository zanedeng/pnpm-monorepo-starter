import type { Fn } from '@zkj/vue3types'

export interface DropMenu {
  onClick?: Fn
  to?: string
  icon?: string
  event: string | number
  text: string
  disabled?: boolean
  divider?: boolean
}
