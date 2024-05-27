import {
  computed,
  getCurrentInstance,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue'
import { isEqual, isFunction } from '@zkj/utils'
import { tryOnUnmounted } from '@zkj/vue3hooks'
import type { Fn, Nullable } from '@zkj/vue3types'
import type {
  ModalMethods,
  ModalProps,
  ModalReturnMethods,
  UseModalInnerReturnType,
  UseModalReturnType,
} from '../typing'

const dataTransfer = reactive<any>({})

const openData = reactive<{ [key: number]: boolean }>({})

function isProdMode(): boolean {
  return import.meta.env.PROD
}

export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<number>(0)

  function register(modalMethod: ModalMethods, uuid: number) {
    if (!getCurrentInstance()) {
      throw new Error(
        'useModal() can only be used inside setup() or functional components!'
      )
    }
    uid.value = uuid
    isProdMode() &&
      onUnmounted(() => {
        modal.value = null
        loaded.value = false
        dataTransfer[String(unref(uid))] = null
      })
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return

    modal.value = modalMethod
    loaded.value = true
    modalMethod.emitOpen = (open: boolean, uid: number) => {
      openData[uid] = open
    }
  }

  const getInstance = () => {
    const instance = unref(modal)
    if (!instance) {
      console.error('useModal instance is undefined!')
    }
    return instance
  }

  const methods: ModalReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props)
    },

    getOpen: computed((): boolean => {
      return openData[~~unref(uid)]
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.()
    },

    openModal: <T = any>(open = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        open,
      })

      if (!data) return
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal) {
        dataTransfer[id] = toRaw(data)
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ open: false })
    },
  }
  return [register, methods]
}

export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<number>(0)

  const getInstance = () => {
    const instance = unref(modalInstanceRef)
    if (!instance) {
      console.error('useModalInner instance is undefined!')
    }
    return instance
  }

  const register = (modalInstance: ModalMethods, uuid: number) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null
      })
    uidRef.value = uuid
    modalInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading })
      },
      getOpen: computed((): boolean => {
        return openData[~~unref(uidRef)]
      }),

      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmLoading: loading })
      },

      closeModal: () => {
        getInstance()?.setModalProps({ open: false })
      },

      setModalProps: (props: Partial<ModalProps>) => {
        getInstance()?.setModalProps(props)
      },

      redoModalHeight: () => {
        const callRedo = getInstance()?.redoModalHeight
        callRedo && callRedo()
      },
    },
  ]
}
