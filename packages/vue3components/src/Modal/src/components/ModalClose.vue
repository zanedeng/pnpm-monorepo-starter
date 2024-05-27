<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <Tooltip
        v-if="fullScreen"
        :title="t('component.modal.restore')"
        placement="bottom"
      >
        <FullscreenExitOutlined role="full" @click="handleFullScreen" />
      </Tooltip>
      <Tooltip v-else :title="t('component.modal.maximize')" placement="bottom">
        <FullscreenOutlined role="close" @click="handleFullScreen" />
      </Tooltip>
    </template>
    <Tooltip :title="t('component.modal.close')" placement="bottom">
      <CloseOutlined @click="handleCancel" />
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { useI18n } from '@zkj/vue3locale'
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '../../../Icon'

defineOptions({ name: 'ModalClose' })

const props = defineProps({
  canFullscreen: { type: Boolean, default: true },
  fullScreen: { type: Boolean },
})

const emit = defineEmits(['cancel', 'fullscreen'])

const prefixCls = 'basic-modal-close'

const { t } = useI18n()

const getClass = computed(() => {
  return [
    prefixCls,
    `${prefixCls}--custom`,
    {
      [`${prefixCls}--can-full`]: props.canFullscreen,
    },
  ]
})

function handleCancel(e: Event) {
  emit('cancel', e)
}

function handleFullScreen(e: Event) {
  e?.stopPropagation()
  e?.preventDefault()
  emit('fullscreen')
}
</script>
