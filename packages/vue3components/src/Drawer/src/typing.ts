import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import type { CSSProperties, ComputedRef, VNodeChild } from 'vue'
import type { ScrollContainerOptions } from '../../Container'

export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps>) => void
  emitOpen?: (open: boolean, uid: number) => void
}

export interface DrawerReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(open?: boolean, data?: T, openOnSet?: boolean) => void
  closeDrawer: () => void
  getOpen?: ComputedRef<boolean>
}

export type DrawerRegisterFn = (
  drawerInstance: DrawerInstance,
  uuid: number
) => void

export interface DrawerReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getOpen?: ComputedRef<boolean>
}

export type UseDrawerReturnType = [DrawerRegisterFn, DrawerReturnMethods]

export type UseDrawerInnerReturnType = [
  DrawerRegisterFn,
  DrawerReturnInnerMethods
]

export interface DrawerFooterProps {
  showOkBtn: boolean
  showCancelBtn: boolean
  cancelText: string
  okText: string
  okType: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default'
  okButtonProps: { props: ButtonProps; on: {} }
  cancelButtonProps: { props: ButtonProps; on: {} }
  confirmLoading: boolean
  showFooter: boolean
  footerHeight: string | number
}

export interface DrawerProps extends DrawerFooterProps {
  isDetail?: boolean
  loading?: boolean
  showDetailBack?: boolean
  open?: boolean
  scrollOptions?: ScrollContainerOptions
  closeFunc?: () => Promise<any>
  triggerWindowResize?: boolean
  closable?: boolean
  destroyOnClose?: boolean
  getContainer?: string | false | HTMLElement | (() => HTMLElement)
  mask?: boolean
  maskClosable?: boolean
  maskStyle?: CSSProperties
  title?: VNodeChild | JSX.Element
  wrapClassName?: string
  class?: string
  rootClassName?: string
  wrapStyle?: CSSProperties
  drawerStyle?: CSSProperties
  bodyStyle?: CSSProperties
  headerStyle?: CSSProperties
  width?: string | number
  height?: string | number
  zIndex?: number
  placement?: 'top' | 'right' | 'bottom' | 'left'
  afterOpenChange?: (open?: boolean) => void
  keyboard?: boolean
  onClose?: (e?: Event) => void
}

export interface DrawerActionType {
  scrollBottom: () => void
  scrollTo: (to: number) => void
  getScrollWrap: () => Element | null
}
