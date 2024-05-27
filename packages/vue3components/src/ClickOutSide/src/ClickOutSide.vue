<template>
  <div ref="wrap">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onClickOutside } from '@zkj/vue3hooks'

const emit = defineEmits(['mounted', 'clickOutside'])
const wrap = ref(null)

onClickOutside(wrap, () => {
  emit('clickOutside')
})

onMounted(() => {
  emit('mounted')
})
</script>
