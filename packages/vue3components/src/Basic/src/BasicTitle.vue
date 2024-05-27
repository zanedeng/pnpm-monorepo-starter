<template>
  <span :class="getClass">
    <slot />
    <BasicHelp
      v-if="helpMessage"
      :class="`${prefixCls}-help`"
      :text="helpMessage"
    />
  </span>
</template>
<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import BasicHelp from './BasicHelp.vue'
import type { PropType } from 'vue'

const props = defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },

  span: { type: Boolean },

  normal: { type: Boolean },
})

const prefixCls = 'basic-title'
const slots = useSlots()
const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}-show-span`]: props.span && slots.default },
  { [`${prefixCls}-normal`]: props.normal },
])
</script>
