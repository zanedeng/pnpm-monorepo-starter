<template>
  <span class="edit-header-cell">
    <slot />
    {{ title }}
    <EditOutlined />
  </span>
</template>
<script lang="ts" setup>
import { EditOutlined } from '../../../Icon'

defineOptions({ name: 'EditTableHeaderIcon' })

defineProps({
  title: { type: String, default: '' },
})
</script>
