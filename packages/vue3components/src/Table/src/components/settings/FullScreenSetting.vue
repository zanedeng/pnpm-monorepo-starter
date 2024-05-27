<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('component.table.settingFullScreen') }}</span>
    </template>
    <FullscreenOutlined v-if="!isFullscreen" @click="toggle" />
    <FullscreenExitOutlined v-else @click="toggle" />
  </Tooltip>
</template>
<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue'
import { useFullscreen } from '@zkj/vue3hooks'
import { useI18n } from '@zkj/vue3locale'
import { FullscreenExitOutlined, FullscreenOutlined } from '../../../../Icon'
import { useTableContext } from '../../hooks/useTableContext'

defineOptions({ name: 'FullScreenSetting' })

const table = useTableContext()
const { t } = useI18n()
const { toggle, isFullscreen } = useFullscreen(table.wrapRef)
</script>
