<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('common.redo') }}</span>
    </template>
    <RedoOutlined @click="redo" />
  </Tooltip>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue'
import { useI18n } from '@zkj/vue3locale'
import { RedoOutlined } from '../../../../Icon'
import { useTableContext } from '../../hooks/useTableContext'

defineOptions({ name: 'RedoSetting' })

const table = useTableContext()
const { t } = useI18n()

function redo() {
  table.reload()
}
</script>
