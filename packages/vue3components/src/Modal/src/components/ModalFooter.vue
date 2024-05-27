<template>
  <div>
    <slot name="insertFooter" />
    <Button
      v-if="showCancelBtn"
      v-bind="cancelButtonProps"
      @click="handleCancel"
    >
      {{ cancelText }}
    </Button>
    <slot name="centerFooter" />
    <Button
      v-if="showOkBtn"
      :type="okType"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      @click="handleOk"
    >
      {{ okText }}
    </Button>
    <slot name="appendFooter" />
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { basicProps } from '../props'

defineOptions({ name: 'BasicModalFooter' })

defineProps(basicProps)

const emit = defineEmits(['ok', 'cancel'])

function handleOk(e: Event) {
  emit('ok', e)
}

function handleCancel(e: Event) {
  emit('cancel', e)
}
</script>
