<template>
  <Drawer v-bind="getBindValues" :class="prefixCls" @close="onClose">
    <template v-if="!$slots.title" #title>
      <DrawerHeader
        :title="getMergeProps.title"
        :is-detail="isDetail"
        :show-detail-back="showDetailBack"
        @close="onClose"
      >
        <template #titleToolbar>
          <slot name="titleToolbar" />
        </template>
      </DrawerHeader>
    </template>
    <template v-else #title>
      <slot name="title" />
    </template>

    <ScrollContainer
      v-loading="getLoading"
      :style="getScrollContentStyle"
      :loading-tip="loadingText || t('common.loadingText')"
    >
      <slot />
    </ScrollContainer>
    <DrawerFooter
      v-bind="getProps"
      :height="getFooterHeight"
      @close="onClose"
      @ok="handleOk"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </DrawerFooter>
  </Drawer>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, ref, unref, watch } from 'vue'
import { Drawer } from 'ant-design-vue'
import { useAttrs } from '@zkj/vue3hooks'
import { useI18n } from '@zkj/vue3locale'
import { deepMerge, isFunction, isNumber } from '@zkj/utils'
import DrawerFooter from './components/DrawerFooter.vue'
import DrawerHeader from './components/DrawerHeader.vue'
import { basicProps } from './props'
import { ScrollContainer } from '../../Container'
import type { DrawerInstance, DrawerProps } from './typing'
import type { CSSProperties, Ref } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps(basicProps)

const emit = defineEmits(['open-change', 'ok', 'close', 'register'])

const openRef = ref(false)
const attrs = useAttrs()
const propsRef = ref({}) as Ref<Partial<DrawerProps>>

const { t } = useI18n()
const prefixCls = 'basic-drawer'

const drawerInstance: DrawerInstance = {
  setDrawerProps,
  emitOpen: undefined,
}

const instance = getCurrentInstance()

instance && emit('register', drawerInstance, instance.uid)

const getMergeProps = computed(() => {
  return deepMerge(props, unref(propsRef))
})

const getProps = computed(() => {
  const opt: Partial<DrawerProps> = {
    placement: 'right',
    ...unref(attrs),
    ...unref(getMergeProps),
    open: unref(openRef),
  }
  opt.title = undefined
  const { isDetail, width, wrapClassName, getContainer } = opt
  if (isDetail) {
    if (!width) {
      opt.width = '100%'
    }
    const detailCls = `${prefixCls}__detail`
    opt.rootClassName = wrapClassName
      ? `${wrapClassName} ${detailCls}`
      : detailCls

    if (!getContainer) {
      opt.getContainer = `.layout-content`
    }
  }
  return opt
})

const getBindValues = computed(() => {
  return {
    ...attrs,
    ...unref(getProps),
  }
})

// Custom implementation of the bottom button,
const getFooterHeight = computed(() => {
  const { footerHeight, showFooter } = unref(getProps)
  if (showFooter && footerHeight) {
    return isNumber(footerHeight)
      ? `${footerHeight}px`
      : `${footerHeight.replace('px', '')}px`
  }
  return `0px`
})

const getScrollContentStyle = computed((): CSSProperties => {
  const footerHeight = unref(getFooterHeight)
  return {
    position: 'relative',
    height: `calc(100% - ${footerHeight})`,
  }
})

const getLoading = computed(() => {
  return !!unref(getProps)?.loading
})

watch(
  () => props.open,
  (newVal, oldVal) => {
    if (newVal !== oldVal) openRef.value = newVal
  },
  { deep: true }
)

watch(
  () => openRef.value,
  (open) => {
    nextTick(() => {
      emit('open-change', open)
      if (instance && drawerInstance.emitOpen) {
        drawerInstance.emitOpen(open, instance.uid)
      }
    })
  }
)

// Cancel event
async function onClose(e) {
  const { closeFunc } = unref(getProps)
  emit('close', e)
  if (closeFunc && isFunction(closeFunc)) {
    const res = await closeFunc()
    openRef.value = !res
    return
  }
  openRef.value = false
}

function setDrawerProps(props: Partial<DrawerProps>) {
  // Keep the last setDrawerProps
  propsRef.value = deepMerge(unref(propsRef), props)

  if (Reflect.has(props, 'open')) {
    openRef.value = !!props.open
  }
}

function handleOk() {
  emit('ok')
}
</script>
