<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="toolbar-button"
    :class="buttonClass"
    :title="title"
    @mousedown="(e) => e.preventDefault()"
    @click="
      (e) =>
        item.click && !item.disabled ? item.click(e) : e.stopPropagation()
    "
  >
    <template v-if="item.icon">
      <component
        :is="item.icon"
        v-if="typeof item.icon == 'object'"
        class="icon"
      />
      <span v-else class="material-icons icon">{{ item.icon }}</span>
    </template>
    <span v-if="item.text" class="label">{{ item.text }}</span>
    <span v-if="item.html" class="label" v-html="item.html" />

    <span v-if="item.chevron === true">
      <ArrowDown />
    </span>
    <span v-else-if="item.chevron" class="chevron" v-html="item.chevron" />

    <component
      :is="getComponent(item.menu)"
      v-if="item.menu"
      :id="item.menu_id"
      class="menu"
      :menu="item.menu"
      :class="item.menu_class"
      :width="item.menu_width"
      :height="item.menu_height"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isMacLike } from '@zkj/utils'
import Menu from './Menu.vue'
import ArrowDown from './ArrowDown.vue'
import type { PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<any>,
    required: true,
  },
  isOpen: Boolean as PropType<boolean>,
})

const isMenu = computed(() => {
  return props.item.menu ? true : false
})

const hotkey = computed(() => {
  let s = props.item.hotkey
  if (typeof s != 'string') return false

  const isMac = isMacLike()
  s = s.toUpperCase()
  s = s.replace(/(shift|⇧)\+/gi, isMac ? '⇧' : 'Shift+')
  s = s.replace(/(control|ctrl|⌃)\+/gi, isMac ? '⌃' : 'Ctrl+')
  s = s.replace(/(option|alt|⌥)\+/gi, isMac ? '⌥' : 'Alt+')
  s = s.replace(/(cmd|command|⌘)\+/gi, isMac ? '⌘' : 'Cmd+')
  return s
})

const title = computed(() => {
  if (props.item.title) {
    let title = props.item.title
    if (hotkey.value) title += ` (${hotkey.value})`
    return title
  } else return null
})

const buttonClass = computed(() => {
  const open = props.isOpen && isMenu.value
  const active = props.item.active
  const disabled = props.item.disabled
  return { open, active, disabled }
})

const getComponent = (is: any) => {
  if (is && !Array.isArray(is) && typeof is == 'object') return is
  else return Menu
}

defineExpose({
  isMenu,
})
</script>
