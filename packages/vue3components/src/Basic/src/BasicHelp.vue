<template>
  <Tooltip
    :overlay-class-name="`${prefixCls}__wrap`"
    :auto-adjust-overflow="true"
    :overlay-style="getOverlayStyle"
    :placement="placement"
    :get-popup-container="() => getPopupContainer()"
  >
    <template #title>
      <div :style="getTooltipStyle">
        <p v-if="isString(text)">{{ text }}</p>
        <template v-if="isArray(text)">
          <p v-for="(item, index) in text" :key="item">
            {{ showIndex ? `${index + 1}. ` : '' }}
            {{ item }}
          </p>
        </template>
        <div v-else>{{ text }}</div>
      </div>
    </template>
    <span :class="prefixCls">
      <slot><InfoOutlined /></slot>
    </span>
  </Tooltip>
</template>
<script lang="ts" setup>
import {
  type CSSProperties,
  type PropType,
  type VNodeChild,
  computed,
} from 'vue'
import { Tooltip } from 'ant-design-vue'
import { isArray, isString } from '@zkj/utils'
import { getPopupContainer } from '../../uitls'
import { InfoOutlined } from '../../Icon'
import type { TooltipPlacement } from 'ant-design-vue/lib/tooltip'

const props = defineProps({
  maxWidth: {
    type: String,
    default: '600px',
  },
  showIndex: {
    type: Boolean,
  },
  color: {
    type: String,
    default: '#ffffff',
  },
  fontSize: {
    type: String,
    default: '14px',
  },
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: 'right',
  },
  text: {
    type: [Array, String, Object] as PropType<
      string[] | string | VNodeChild | JSX.Element
    >,
  },
})

const prefixCls = 'basic-help'

const getTooltipStyle = computed(
  (): CSSProperties => ({ color: props.color, fontSize: props.fontSize })
)

const getOverlayStyle = computed(
  (): CSSProperties => ({ maxWidth: props.maxWidth })
)
</script>
