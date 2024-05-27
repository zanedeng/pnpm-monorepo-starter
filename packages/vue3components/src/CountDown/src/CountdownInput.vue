<template>
  <a-input v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
    <template #addonAfter>
      <CountButton
        :size="size"
        :count="count"
        :value="state"
        :before-start-func="sendCodeApi"
      />
    </template>
    <template
      v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')"
      #[item]="data"
    >
      <slot :name="item" v-bind="data || {}" />
    </template>
  </a-input>
</template>

<script lang="ts" setup>
import CountButton from './CountButton.vue'
import { useRuleFormItem } from '../../Form/src/hooks/useFormItem'
import type { PropType } from 'vue'

defineOptions({ name: 'CountDownInput', inheritAttrs: false })

const props = defineProps({
  value: { type: String },
  size: {
    type: String,
    validator: (v: string) => ['default', 'large', 'small'].includes(v),
  },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
})

const prefixCls = 'countdown-input'
const [state] = useRuleFormItem(props)
</script>
