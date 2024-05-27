<template>
  <span class="thumb">
    <Image v-if="fileUrl" :src="fileUrl" :width="104" />
  </span>
</template>

<script lang="ts" setup>
import { Image } from 'ant-design-vue'

defineProps({
  fileUrl: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
})
</script>
