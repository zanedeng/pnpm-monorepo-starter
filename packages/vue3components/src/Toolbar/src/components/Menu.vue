<template>
  <div class="toolbar-menu">
    <div class="extended-hover-zone" />
    <div
      class="toolbar-menu-items"
      :style="{
        width: width + 'px',
        minWidth: width + 'px',
        maxHeight: height + 'px',
        overflow: height ? 'auto' : 'visible',
      }"
    >
      <component
        :is="getComponent(item.is)"
        v-for="(item, index) in menu"
        :id="item.id"
        :key="'menu-' + index"
        :item="item"
        :class="item.class"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import MenuSeparator from './MenuSeparator.vue'
import type { Component, PropType } from 'vue'

defineProps({
  menu: {
    type: Array as PropType<any[]>,
    required: true,
  },
  width: Number as PropType<number>,
  height: Number as PropType<number>,
})

const componentDict: { [key: string]: Component } = {
  'toolbar-menu-separator': MenuSeparator,
}

const getComponent = (is: any) => {
  if (typeof is == 'object') return is
  else if (typeof is == 'string')
    return componentDict[`toolbar-menu-${is.toLocaleLowerCase()}`]
  else return MenuItem
}
</script>
