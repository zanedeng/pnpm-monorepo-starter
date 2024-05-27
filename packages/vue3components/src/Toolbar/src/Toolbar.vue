<template>
  <ClickOutSide class="toolbar" @click-outside="handleClickOutside">
    <component
      :is="getComponent(item.is)"
      v-for="(item, itemIdx) in content"
      :id="item.id"
      :key="'toolbar-item-' + itemIdx"
      :ref="(el: any) =>
    Object.defineProperty(item, '_el', { value: el, writable: true })
    "
      :item="item"
      :class="item.class"
      :is-open="menuOpen"
      @click="toggleMenu(item, $event)"
    />
  </ClickOutSide>
</template>

<script lang="ts" setup>
import { type Component, type PropType, ref } from 'vue'
import { hyphenate } from '@zkj/utils'
import { ClickOutSide } from '../../ClickOutSide'
import ButtonGeneric from './components/ButtonGeneric.vue'
import Menu from './components/Menu.vue'
import MenuItem from './components/MenuItem.vue'
import MenuSeparator from './components/MenuSeparator.vue'
import Separator from './components/Separator.vue'
import Spacer from './components/Spacer.vue'

defineProps({
  content: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const menuOpen = ref(false)

const componentDict: { [key: string]: Component } = {
  'toolbar-button-generic': ButtonGeneric,
  'toolbar-menu': Menu,
  'toolbar-menu-item': MenuItem,
  'toolbar-menu-separator': MenuSeparator,
  'toolbar-separator': Separator,
  'toolbar-spacer': Spacer,
}

const getComponent = (is: any) => {
  if (is && !Array.isArray(is) && typeof is == 'object') return is
  else if (typeof is == 'string')
    return componentDict[hyphenate(`toolbar-${is}`)]
  else return ButtonGeneric
}

const toggleMenu = (
  item: { _el: { isMenu: any }; disabled: any },
  event: {
    stopPropagation: () => void
    sourceCapabilities: { firesTouchEvents: any }
  }
) => {
  event.stopPropagation()
  const touch =
    event.sourceCapabilities && event.sourceCapabilities.firesTouchEvents
  menuOpen.value =
    item._el.isMenu && !item.disabled ? (touch ? true : !menuOpen.value) : false
}

const handleClickOutside = () => {
  menuOpen.value = false
}
</script>
