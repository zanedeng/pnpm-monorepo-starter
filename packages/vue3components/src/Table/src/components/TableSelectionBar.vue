<template>
  <a-alert type="info" show-icon :class="[prefixCls]">
    <template #message>
      <span v-if="props.count > 0">
        {{ t('component.table.selectionBarTips', { count: props.count }) }}
      </span>
      <span v-else>
        {{ t('component.table.selectionBarEmpty') }}
      </span>
      <a-button
        v-show="props.count > 0"
        type="link"
        size="small"
        @click="clearSelectedRowKeys"
      >
        {{ t('component.table.selectionBarClear') }}
      </a-button>
    </template>
  </a-alert>
</template>

<script lang="ts" setup>
import { Alert as AAlert } from 'ant-design-vue'
import { useI18n } from '@zkj/vue3locale'
import type { TableActionType } from '../types/table'

const { t } = useI18n()

const prefixCls = 'table-select-bar'

defineOptions({
  name: 'TableSelectBar',
})

const props = withDefaults(
  defineProps<{
    count?: number
    //
    clearSelectedRowKeys: TableActionType['clearSelectedRowKeys']
  }>(),
  {
    count: () => 0,
  }
)
</script>
