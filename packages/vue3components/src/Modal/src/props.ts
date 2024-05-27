import { useI18n } from '@zkj/vue3locale'
import type { VueNode } from '@zkj/vue3types'
import type {
  ButtonProps,
  ButtonType,
} from 'ant-design-vue/es/button/buttonTypes'
import type { CSSProperties, PropType } from 'vue'
import type { ModalWrapperProps } from './typing'

const { t } = useI18n()

export const modalProps = {
  open: { type: Boolean },
  scrollTop: { type: Boolean, default: true },
  height: { type: Number },
  minHeight: { type: Number },
  draggable: { type: Boolean, default: true },
  centered: { type: Boolean },
  cancelText: { type: String, default: t('common.cancelText') },
  okText: { type: String, default: t('common.okText') },
  closeFunc: Function as PropType<() => Promise<boolean>>,
}

export const basicProps: any = Object.assign({}, modalProps, {
  defaultFullscreen: { type: Boolean },
  canFullscreen: { type: Boolean, default: true },
  wrapperFooterOffset: { type: Number, default: 0 },
  helpMessage: [String, Array] as PropType<string | string[]>,
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  showCancelBtn: { type: Boolean, default: true },
  showOkBtn: { type: Boolean, default: true },
  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,
  afterClose: Function as PropType<() => Promise<VueNode>>,
  bodyStyle: Object as PropType<CSSProperties>,
  closable: { type: Boolean, default: true },
  closeIcon: Object as PropType<VueNode>,
  confirmLoading: { type: Boolean },
  destroyOnClose: { type: Boolean },
  footer: Object as PropType<VueNode>,
  getContainer: Function as PropType<() => any>,
  mask: { type: Boolean, default: true },
  maskClosable: { type: Boolean, default: true },
  keyboard: { type: Boolean, default: true },
  maskStyle: Object as PropType<CSSProperties>,
  okType: { type: String as PropType<ButtonType>, default: 'primary' },
  okButtonProps: Object as PropType<ButtonProps>,
  cancelButtonProps: Object as PropType<ButtonProps>,
  title: { type: String },
  open: { type: Boolean },
  width: [String, Number] as PropType<string | number>,
  wrapClassName: { type: String },
  zIndex: { type: Number },
})
