<template>
  <Scrollbar
    ref="scrollbarRef"
    class="scroll-container"
    :scroll-height="scrollHeight"
    v-bind="$attrs"
  >
    <slot />
  </Scrollbar>
</template>

<script lang="ts" setup>
import { nextTick, ref, unref } from 'vue'
import { useScrollTo } from '@zkj/vue3hooks'
import { type Nullable } from '@zkj/vue3types'
import { Scrollbar, type ScrollbarType } from '../../Scrollbar'

defineOptions({ name: 'ScrollContainer' })

defineProps({
  scrollHeight: {
    type: Number,
  },
})

const scrollbarRef = ref<Nullable<ScrollbarType>>(null)

function getScrollWrap() {
  const scrollbar = unref(scrollbarRef)
  if (!scrollbar) {
    return null
  }
  return scrollbar.wrap
}

function scrollTo(to: number, duration = 500) {
  const wrap = unref(getScrollWrap())
  nextTick(() => {
    if (!wrap) {
      return
    }
    const { start } = useScrollTo({
      el: wrap,
      to,
      duration,
    })
    start()
  })
}

function scrollBottom() {
  const wrap = unref(getScrollWrap())
  nextTick(() => {
    if (!wrap) {
      return
    }
    const scrollHeight = wrap.scrollHeight as number
    const { start } = useScrollTo({
      el: wrap,
      to: scrollHeight,
    })
    start()
  })
}

defineExpose({
  scrollTo,
  scrollBottom,
})
</script>
