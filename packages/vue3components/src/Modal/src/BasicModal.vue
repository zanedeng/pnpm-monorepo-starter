<template>
  <Modal v-bind="getBindValue" @cancel="handleCancel">
    <template v-if="!$slots.closeIcon" #closeIcon>
      <ModalClose
        :can-fullscreen="getProps.canFullscreen"
        :full-screen="fullScreenRef"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>

    <template v-if="!$slots.title" #title>
      <ModalHeader
        :help-message="getProps.helpMessage"
        :title="getMergeProps.title"
        @dblclick="handleTitleDbClick"
      />
    </template>

    <template v-if="!$slots.footer" #footer>
      <ModalFooter v-bind="getBindValue" @ok="handleOk" @cancel="handleCancel">
        <template v-for="item in Object.keys($slots)" #[item]="data">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </ModalFooter>
    </template>

    <ModalWrapper
      ref="modalWrapperRef"
      :use-wrapper="getProps.useWrapper"
      :footer-offset="wrapperFooterOffset"
      :full-screen="fullScreenRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :min-height="getProps.minHeight"
      :height="getWrapperHeight"
      :open="openRef"
      :modal-footer-height="footer !== undefined && !footer ? 0 : undefined"
      v-bind="
        omit(getProps.wrapperProps, 'open', 'height', 'modalFooterHeight')
      "
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    >
      <slot />
    </ModalWrapper>

    <template
      v-for="item in Object.keys(omit($slots, 'default'))"
      #[item]="data"
    >
      <slot :name="item" v-bind="data || {}" />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  toRef,
  unref,
  useAttrs,
  watch,
  watchEffect,
} from 'vue'
import { deepMerge, isFunction, omit } from '@zkj/utils'
import Modal from './components/Modal.vue'
import ModalWrapper from './components/ModalWrapper.vue'
import ModalClose from './components/ModalClose.vue'
import ModalFooter from './components/ModalFooter.vue'
import ModalHeader from './components/ModalHeader.vue'
import { basicProps } from './props'
import { useFullScreen } from './hooks/useModalFullScreen'
import type { Recordable } from '@zkj/vue3types'
import type { ModalMethods, ModalProps } from './typing'

defineOptions({ name: 'BasicModal', inheritAttrs: false })

const props = defineProps(basicProps)

const emit = defineEmits([
  'open-change',
  'height-change',
  'cancel',
  'ok',
  'register',
  'update:open',
  'fullscreen',
])

const attrs = useAttrs()
const openRef = ref(false)
const propsRef = ref<Partial<ModalProps> | null>(null)
const modalWrapperRef = ref<any>(null)
const prefixCls = 'basic-modal'

const extHeightRef = ref(0)
const modalMethods: ModalMethods = {
  setModalProps,
  emitOpen: undefined,
  redoModalHeight: () => {
    nextTick(() => {
      if (unref(modalWrapperRef)) {
        ;(unref(modalWrapperRef) as any).setModalHeight()
      }
    })
  },
}

const instance = getCurrentInstance()
if (instance) {
  emit('register', modalMethods, instance.uid)
}

const getMergeProps = computed((): Recordable => {
  return {
    ...props,
    ...(unref(propsRef) as any),
  }
})

const {
  handleFullScreen: handleFullScreenInner,
  getWrapClassName,
  fullScreenRef,
} = useFullScreen({
  modalWrapperRef,
  extHeightRef,
  wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
})

const getProps = computed((): Recordable => {
  const opt = {
    ...unref(getMergeProps),
    open: unref(openRef),
    okButtonProps: undefined,
    cancelButtonProps: undefined,
    title: undefined,
  }
  return {
    ...opt,
    wrapClassName: unref(getWrapClassName),
  }
})

const getBindValue = computed((): Recordable => {
  const attr: Recordable = {
    ...attrs,
    ...unref(getMergeProps),
    open: unref(openRef),
  }
  attr['wrapClassName'] =
    `${attr['wrapClassName'] || ''} ${unref(getWrapClassName)}` +
    'vben-basic-modal-wrap'
  if (unref(fullScreenRef)) {
    return omit(attr, ['height', 'title'])
  }
  return omit(attr, 'title')
})

const getWrapperHeight = computed(() => {
  if (unref(fullScreenRef)) return undefined
  return unref(getProps).height
})

watchEffect(() => {
  openRef.value = !!props.open
  fullScreenRef.value = !!props.defaultFullscreen
})

watch(
  () => unref(openRef),
  (v) => {
    emit('open-change', v)
    emit('update:open', v)
    if (instance && modalMethods.emitOpen) {
      modalMethods.emitOpen(v, instance.uid)
    }
    nextTick(() => {
      if (props.scrollTop && v && unref(modalWrapperRef)) {
        ;(unref(modalWrapperRef) as any).scrollTop()
      }
    })
  },
  {
    immediate: false,
  }
)

async function handleCancel(e: Event) {
  e?.stopPropagation()
  if (
    (e.target as HTMLElement)?.classList?.contains(`${prefixCls}-close--custom`)
  )
    return
  if (props.closeFunc && isFunction(props.closeFunc)) {
    const isClose: boolean = await props.closeFunc()
    openRef.value = !isClose
    return
  }

  openRef.value = false
  emit('cancel', e)
}

function setModalProps(props: Partial<ModalProps>): void {
  propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
  if (Reflect.has(props, 'open')) {
    openRef.value = !!props.open
  }
  if (Reflect.has(props, 'defaultFullscreen')) {
    fullScreenRef.value = !!props.defaultFullscreen
  }
}

function handleOk(e: Event) {
  emit('ok', e)
}

function handleHeightChange(height: string) {
  emit('height-change', height)
}

function handleExtHeight(height: number) {
  extHeightRef.value = height
}

function handleTitleDbClick(e: MouseEvent) {
  if (!props.canFullscreen) return
  e.stopPropagation()
  handleFullScreen(e)
}

function handleFullScreen(e: Event) {
  handleFullScreenInner(e)
  emit('fullscreen')
}
</script>
