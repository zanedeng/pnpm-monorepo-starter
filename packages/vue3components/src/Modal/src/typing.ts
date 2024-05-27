import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import type { CSSProperties, ComputedRef, VNodeChild } from 'vue'

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void
  emitOpen?: (open: boolean, uid: number) => void
  redoModalHeight?: () => void
}

export type ModalRegisterFn = (modalMethods: ModalMethods, uuid: number) => void

export interface ModalReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  closeModal: () => void
  getOpen?: ComputedRef<boolean>
}

export type UseModalReturnType = [ModalRegisterFn, ModalReturnMethods]

export interface ModalReturnInnerMethods extends ModalMethods {
  closeModal: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getOpen?: ComputedRef<boolean>
  redoModalHeight: () => void
}

export type UseModalInnerReturnType = [ModalRegisterFn, ModalReturnInnerMethods]

export interface ModalProps {
  minHeight?: number
  height?: number
  wrapperFooterOffset?: number
  draggable?: boolean
  scrollTop?: boolean
  canFullscreen?: boolean
  defaultFullscreen?: boolean
  open?: boolean
  helpMessage: string | string[]
  useWrapper: boolean
  loading: boolean
  loadingTip?: string
  wrapperProps: Omit<ModalWrapperProps, 'loading'>
  showOkBtn: boolean
  showCancelBtn: boolean
  closeFunc: () => Promise<any>
  afterClose?: () => any
  bodyStyle?: CSSProperties
  cancelText?: string
  centered?: boolean
  closable?: boolean
  closeIcon?: VNodeChild | JSX.Element
  confirmLoading?: boolean
  destroyOnClose?: boolean
  footer?: VNodeChild | JSX.Element
  getContainer?: (instance: any) => HTMLElement
  mask?: boolean
  maskClosable?: boolean
  maskStyle?: CSSProperties
  okText?: string
  okType?: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default'
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  title?: VNodeChild | JSX.Element
  width?: string | number
  wrapClassName?: string
  zIndex?: number
}

export interface ModalWrapperProps {
  footerOffset?: number
  loading: boolean
  modalHeaderHeight: number
  modalFooterHeight: number
  minHeight: number
  height: number
  open: boolean
  fullScreen: boolean
  useWrapper: boolean
}
