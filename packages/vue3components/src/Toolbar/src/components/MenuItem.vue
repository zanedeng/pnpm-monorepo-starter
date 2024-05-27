<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="toolbar-menu-item"
    :class="{ disabled: item.disabled, active: item.active }"
    :title="item.title"
    :style="{ height: item.height + 'px' }"
    @mousedown="(e) => e.preventDefault()"
    @click="handleClick"
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
    <span v-if="item.hotkey" class="hotkey">{{ hotkey }}</span>

    <span
      v-if="item.menu && item.custom_chevron"
      class="chevron"
      v-html="item.custom_chevron"
    />
    <span v-else-if="item.menu" class="material-icons chevron">
      <ArrowDown />
    </span>

    <component
      :is="getComponent(item.menu)"
      v-if="item.menu"
      :id="item.menu_id"
      ref="menuRef"
      class="menu"
      :menu="item.menu"
      :class="item.menu_class"
      :width="item.menu_width"
      :height="item.menu_height"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { isMacLike } from '@zkj/utils'
import Menu from './Menu.vue'
import ArrowDown from './ArrowDown.vue'
import type { PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<any>,
    required: true,
  },
})

const menuRef = ref()

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

const handleClick = (evt: MouseEvent) => {
  if (props.item.click && !props.item.disabled) props.item.click(evt)
  else if (
    !menuRef.value ||
    !evt.composedPath ||
    !evt.composedPath().includes(menuRef.value)
  ) {
    evt.stopPropagation()
  }
}

const getComponent = (is: any) => {
  if (is && !Array.isArray(is) && typeof is == 'object') return is
  else return Menu
}
</script>
