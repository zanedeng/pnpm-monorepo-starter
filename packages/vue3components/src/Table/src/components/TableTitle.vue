<template>
  <BasicTitle v-if="getTitle" :class="prefixCls" :help-message="helpMessage">
    {{ getTitle }}
  </BasicTitle>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { isFunction, noop } from '@zkj/utils'
import { BasicTitle } from '../../../Basic'
import type { PropType } from 'vue'

defineOptions({ name: 'BasicTableTitle' })

const props = defineProps({
  title: {
    type: [Function, String] as PropType<string | ((data: any) => string)>,
  },
  getSelectRows: {
    type: Function as PropType<() => any[]>,
  },
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
})

const prefixCls = 'basic-table-title'

const getTitle = computed(() => {
  const { title, getSelectRows = noop } = props
  let tit = title

  if (isFunction(title)) {
    tit = title({
      selectRows: getSelectRows(),
    })
  }
  return tit
})
</script>
