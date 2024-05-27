<template>
  <BasicTitle :help-message="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts" setup>
import { BasicTitle } from '../../../Basic'
import type { PropType } from 'vue'

defineOptions({ name: 'BasicModalHeader' })

defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
  title: { type: String },
})
</script>
