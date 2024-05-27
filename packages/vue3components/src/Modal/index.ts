import { Modal } from 'ant-design-vue'
import basicModal from './src/BasicModal.vue'
import { withInstall } from '../uitls'
import type { ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'

export { Modal, ModalFuncProps }

export const BasicModal = withInstall(basicModal)
export { useModalContext } from './src/hooks/useModalContext'
export { useModal, useModalInner } from './src/hooks/useModal'
export * from './src/typing'
