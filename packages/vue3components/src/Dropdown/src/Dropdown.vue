<template>
  <Dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot />
    </span>
    <template #overlay>
      <Menu :selected-keys="selectedKeys">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <MenuItem
            v-bind="getAttr(item.event)"
            :disabled="item.disabled"
            @click="handleClickMenu(item)"
          >
            <Popconfirm
              v-if="popconfirm && item.popConfirm"
              v-bind="getPopConfirmAttrs(item.popConfirm)"
              :disabled="item.disabled"
            >
              <template v-if="item.popConfirm.icon" #icon>
                <Icon :icon="item.popConfirm.icon" />
              </template>
              <div>
                <Icon v-if="item.icon" :icon="item.icon" />
                <span class="ml-1">{{ item.text }}</span>
              </div>
            </Popconfirm>
            <template v-else>
              <Icon v-if="item.icon" :icon="item.icon" />
              <span class="ml-1">{{ item.text }}</span>
            </template>
          </MenuItem>
          <MenuDivider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Dropdown, Menu, Popconfirm } from 'ant-design-vue'
import { isFunction, omit } from '@zkj/utils'
import { type Recordable } from '@zkj/vue3types'
import { type DropMenu } from './typing'
import { Icon } from '../../Icon'
import type { PropType } from 'vue'

const MenuItem = Menu.Item
const MenuDivider = Menu.Divider

const props = defineProps({
  popconfirm: Boolean,
  trigger: {
    type: Array as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => {
      return ['contextmenu']
    },
  },
  dropMenuList: {
    type: Array as PropType<(DropMenu & Recordable<any>)[]>,
    default: () => [],
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits(['menuEvent'])

function handleClickMenu(item: DropMenu) {
  const { event } = item
  const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`)
  emit('menuEvent', menu)
  item.onClick?.()
}

const getPopConfirmAttrs = computed(() => {
  return (attrs: any) => {
    const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon'])
    if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
      originAttrs['onConfirm'] = attrs.confirm
    if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
      originAttrs['onCancel'] = attrs.cancel
    return originAttrs
  }
})

const getAttr = (key: string | number) => ({ key })
</script>
