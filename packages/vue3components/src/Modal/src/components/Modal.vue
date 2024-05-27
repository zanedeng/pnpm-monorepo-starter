<template>
  <Modal v-bind="propsData">
    <template v-for="(slotFn, slotName) in extendedSlots" :key="slotName">
      <component
        :is="() => slotFn()"
        v-if="typeof slotFn === 'function'"
        :key="slotName"
      />
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, toRefs, unref } from 'vue'
import { Modal } from 'ant-design-vue'
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/useModalDrag'
import { extendSlots } from '../../../uitls'
import type { Recordable } from '@zkj/vue3types'

const emit = defineEmits(['cancel'])

const props = defineProps(basicProps)

const instance = getCurrentInstance()

const { open, draggable, destroyOnClose } = toRefs(props)

useModalDragMove({
  open,
  destroyOnClose,
  draggable,
})

const onCancel = (e: Event) => {
  emit('cancel', e)
}

const extendedSlots = computed(() => extendSlots(instance?.slots!))

const propsData = computed(
  () => ({ ...unref(instance?.attrs), ...props, onCancel } as Recordable)
)
</script>
