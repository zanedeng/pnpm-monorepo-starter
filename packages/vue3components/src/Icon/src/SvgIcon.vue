<template>
  <svg
    :class="[
      'inline-block overflow-hidden fill-current -align-[0.15em]',
      $attrs.class,
      spin && 'animate-[loadingCircle_1s_infinite_linear]',
    ]"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

defineOptions({ name: 'SvgIcon' })

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  spin: {
    type: Boolean,
    default: false,
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s,
  }
})
</script>
