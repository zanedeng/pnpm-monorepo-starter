<template>
  <section
    v-show="loading"
    class="flex fixed z-[200] top-0 left-0 items-center justify-center w-full h-full"
    :class="{
      'absolute z-[300]': absolute,
    }"
    :style="{
      'background-color': background ? background : 'rgb(240 242 245 / 40%)',
    }"
  >
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>
<script lang="ts" setup>
import { Spin } from 'ant-design-vue'
import type { PropType } from 'vue'

defineOptions({ name: 'Loading' })

defineProps({
  tip: {
    type: String as PropType<string>,
    default: '',
  },
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'large',
    validator: (v: 'default' | 'small' | 'large'): boolean => {
      return ['default', 'small', 'large'].includes(v)
    },
  },
  absolute: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  background: {
    type: String as PropType<string>,
  },
  theme: {
    type: String as PropType<'dark' | 'light'>,
  },
})
</script>
