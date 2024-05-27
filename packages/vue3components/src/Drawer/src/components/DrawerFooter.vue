<template>
  <div v-if="showFooter || $slots.footer" :class="prefixCls" :style="getStyle">
    <template v-if="!$slots.footer">
      <slot name="insertFooter" />
      <Button
        v-if="showCancelBtn"
        v-bind="cancelButtonProps"
        class="mr-2"
        @click="handleClose"
      >
        {{ cancelText }}
      </Button>
      <slot name="centerFooter" />
      <Button
        v-if="showOkBtn"
        :type="okType"
        v-bind="okButtonProps"
        class="mr-2"
        :loading="confirmLoading"
        @click="handleOk"
      >
        {{ okText }}
      </Button>
      <slot name="appendFooter" />
    </template>

    <template v-else>
      <slot name="footer" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { type CSSProperties, computed } from 'vue'
import { footerProps } from '../props'
import { Button } from '../../../Button'

defineOptions({ name: 'BasicDrawerFooter' })

const props = defineProps({
  ...footerProps,
  height: {
    type: String,
    default: '60px',
  },
})

const emit = defineEmits(['ok', 'close'])

const prefixCls = 'basic-drawer-footer'

const getStyle = computed((): CSSProperties => {
  const heightStr = `${props.height}`
  return {
    height: heightStr,
    lineHeight: `calc(${heightStr} - 1px)`,
  }
})

function handleOk() {
  emit('ok')
}

function handleClose() {
  emit('close')
}
</script>
