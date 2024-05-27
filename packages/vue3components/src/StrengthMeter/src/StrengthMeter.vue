<template>
  <div :class="prefixCls" class="relative">
    <Input.Password
      v-if="showInput"
      v-bind="$attrs"
      allow-clear
      :value="innerValueRef"
      :disabled="!!disabled"
      @change="handleChange"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </Input.Password>
    <div :class="`${prefixCls}-bar`">
      <div
        :class="`${prefixCls}-bar--fill`"
        :data-score="getPasswordStrength"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, unref, watch, watchEffect } from 'vue'
import { Input } from 'ant-design-vue'
import { zxcvbn } from '@zxcvbn-ts/core'
import type { PropType } from 'vue'

defineOptions({ name: 'StrengthMeter' })

const props = defineProps({
  value: {
    type: String as PropType<string>,
  },
  showInput: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
  },
})

const emit = defineEmits(['score-change', 'change'])

const innerValueRef = ref('')
const prefixCls = 'strength-meter'

const getPasswordStrength = computed(() => {
  const { disabled } = props
  if (disabled) return -1
  const innerValue = unref(innerValueRef)
  const score = innerValue ? zxcvbn(unref(innerValueRef)).score : -1
  emit('score-change', score)
  return score
})

function handleChange(e: any) {
  emit('change', e.target.value)
  innerValueRef.value = e.target.value
}

watchEffect(() => {
  innerValueRef.value = props.value || ''
})

watch(
  () => unref(innerValueRef),
  (val) => {
    emit('change', val)
  }
)
</script>
