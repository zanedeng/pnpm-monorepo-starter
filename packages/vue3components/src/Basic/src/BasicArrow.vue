<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '../../Icon'

const props = defineProps({
  expand: { type: Boolean },
  up: { type: Boolean },
  down: { type: Boolean },
  inset: { type: Boolean },
})

const prefixCls = 'basic-arrow'

const getClass = computed(() => {
  const { expand, up, down, inset } = props
  return [
    prefixCls,
    {
      [`${prefixCls}--active`]: expand,
      up,
      inset,
      down,
    },
  ]
})
</script>
