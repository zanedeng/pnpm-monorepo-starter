<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #icon>
      <slot name="icon" />
    </template>
    <template #default="data">
      <Icon v-if="preIcon" :icon="preIcon" :size="iconSize" />
      <slot v-bind="data || {}" />
      <Icon v-if="postIcon" :icon="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { useAttrs } from '@zkj/vue3hooks'
import { buttonProps } from './props'
import { Icon } from '../../Icon'
import type { ComponentOptionsMixin } from 'vue'

defineOptions({
  name: 'AButton',
  extends: Button as ComponentOptionsMixin,
  inheritAttrs: false,
})

const props = defineProps(buttonProps)

const attrs = useAttrs({ excludeDefaultKeys: false })
const getButtonClass = computed(() => {
  const { color, disabled } = props
  return [
    {
      [`ant-btn-${color}`]: !!color,
      [`is-disabled`]: disabled,
    },
  ]
})

const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>
