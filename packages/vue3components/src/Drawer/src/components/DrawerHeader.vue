<template>
  <BasicTitle v-if="!isDetail" :class="prefixCls">
    <slot name="title" />
    {{ !$slots.title ? title : '' }}
  </BasicTitle>

  <div v-else :class="[prefixCls, `${prefixCls}--detail`]">
    <span :class="`${prefixCls}__twrap`">
      <span v-if="showDetailBack" @click="handleClose">
        <ArrowLeftOutlined :class="`${prefixCls}__back`" />
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar" />
    </span>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeftOutlined } from '../../../Icon'
import { BasicTitle } from '../../../Basic'
import type { PropType } from 'vue'

defineOptions({ name: 'BasicDrawerHeader' })

defineProps({
  isDetail: {
    type: Boolean as PropType<boolean>,
  },
  showDetailBack: {
    type: Boolean as PropType<boolean>,
  },
  title: {
    type: String as PropType<string>,
  },
})

const emit = defineEmits(['close'])

const prefixCls = 'basic-drawer-header'

function handleClose() {
  emit('close')
}
</script>
