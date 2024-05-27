<template>
  <SvgIcon
    v-if="isSvgIcon"
    :size="size"
    :name="getSvgIcon"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />

  <span
    v-else
    ref="elRef"
    :class="[
      $attrs.class,
      'inline-block',
      spin && 'animate-[loadingCircle_1s_infinite_linear]',
    ]"
    :style="getWrapStyle"
  />
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { isString } from '@zkj/utils'
import SvgIcon from './SvgIcon.vue'
import type { CSSProperties, PropType } from 'vue'

const SVG_END_WITH_FLAG = '|svg'

defineOptions({ name: 'Icon' })

const props = defineProps({
  icon: String,
  color: String,
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  spin: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  prefix: {
    type: String as PropType<string>,
    default: '',
  },
})

const elRef = ref(null)

const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))

const getSvgIcon = computed(() => props.icon?.replace(SVG_END_WITH_FLAG, ''))

const getIconRef = computed(
  () => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`
)

const update = async () => {
  if (unref(isSvgIcon)) return

  const el: any = unref(elRef)
  if (!el) return

  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) return

  const span = document.createElement('span')
  span.style.display = 'block'
  span.style.minWidth = '1em'
  span.style.minHeight = '1em'
  span.style.borderRadius = '100%'
  span.dataset.icon = icon
  el.textContent = ''
  el.appendChild(span)
}

const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size)) {
    fs = parseInt(size, 10)
  }

  return {
    fontSize: `${fs}px`,
    color,
    display: 'inline-flex',
  }
})

watch(() => props.icon, update, { flush: 'post' })

onMounted(update)
</script>
