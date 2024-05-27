<template>
  <div :class="[prefixCls, getAlign]" @click="onCellClick">
    <template
      v-for="(action, index) in getActions"
      :key="`${index}-${action.label}`"
    >
      <Tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)">
        <PopConfirmButton v-bind="omit(action, 'icon')">
          <Icon
            v-if="action.icon"
            :icon="action.icon"
            :class="{ 'mr-1': !!action.label }"
          />
          <template v-if="action.label">{{ action.label }}</template>
        </PopConfirmButton>
      </Tooltip>
      <PopConfirmButton v-else v-bind="omit(action, 'icon')">
        <Icon
          v-if="action.icon"
          :icon="action.icon"
          :class="{ 'mr-1': !!action.label }"
        />
        <template v-if="action.label">{{ action.label }}</template>
      </PopConfirmButton>
      <Divider
        v-if="divider && index < getActions.length - 1"
        type="vertical"
        class="action-divider"
      />
    </template>
    <Dropdown
      v-if="dropDownActions && getDropdownList.length > 0"
      :trigger="['hover']"
      :drop-menu-list="getDropdownList"
      popconfirm
    >
      <slot name="more" />
      <a-button v-if="!$slots.more" type="link" size="small">
        <MoreOutlined class="icon-more" />
      </a-button>
    </Dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRaw, unref } from 'vue'
import { Divider, Tooltip } from 'ant-design-vue'
import { isBoolean, isFunction, isString, omit } from '@zkj/utils'
import { useTableContext } from '../hooks/useTableContext'
import { ACTION_COLUMN_FLAG } from '../const'
import { Icon, MoreOutlined } from '../../../Icon'
import { PopConfirmButton } from '../../../Button'
import { Dropdown } from '../../../Dropdown'
import type { TableActionType } from '../types/table'
import type { PropType } from 'vue'
import type { TooltipProps } from 'ant-design-vue'
import type { ActionItem } from '../types/tableAction'

defineOptions({ name: 'TableAction' })

const props = defineProps({
  actions: {
    type: Array as PropType<ActionItem[]>,
    default: null,
  },
  dropDownActions: {
    type: Array as PropType<ActionItem[]>,
    default: null,
  },
  divider: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  outside: {
    type: Boolean as PropType<boolean>,
  },
  stopButtonPropagation: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  hasPermission: {
    type: Function as PropType<
      (code: string | string[] | undefined) => boolean
    >,
  },
})

const prefixCls = 'basic-table-action'
let table: Partial<TableActionType> = {}
if (!props.outside) {
  table = useTableContext()
}

function isIfShow(action: ActionItem): boolean {
  const ifShow = action.ifShow

  let isIfShow = true

  if (isBoolean(ifShow)) {
    isIfShow = ifShow
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(action)
  }
  return isIfShow
}

const getActions = computed(() => {
  return (toRaw(props.actions) || [])
    .filter((action) => {
      return props.hasPermission?.(action.auth) && isIfShow(action)
    })
    .map((action) => {
      const { popConfirm } = action
      return {
        getPopupContainer: () =>
          unref((table as any)?.wrapRef) ?? document.body,
        type: 'link',
        size: 'small',
        ...action,
        ...(popConfirm || {}),
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        enable: !!popConfirm,
      }
    })
})

const getDropdownList = computed((): any[] => {
  const list = (toRaw(props.dropDownActions) || []).filter((action) => {
    return props.hasPermission?.(action.auth) && isIfShow(action)
  })
  return list.map((action, index) => {
    const { label, popConfirm } = action
    return {
      ...action,
      ...popConfirm,
      onConfirm: popConfirm?.confirm,
      onCancel: popConfirm?.cancel,
      text: label,
      divider: index < list.length - 1 ? props.divider : false,
    }
  })
})

const getAlign = computed(() => {
  const columns = (table as TableActionType)?.getColumns?.() || []
  const actionColumn = columns.find((item) => item.flag === ACTION_COLUMN_FLAG)
  return actionColumn?.align ?? 'left'
})

function getTooltip(data: string | TooltipProps): TooltipProps {
  return {
    getPopupContainer: () => unref((table as any)?.wrapRef) ?? document.body,
    placement: 'bottom',
    ...(isString(data) ? { title: data } : data),
  }
}

function onCellClick(e: MouseEvent) {
  if (!props.stopButtonPropagation) return
  const path = e.composedPath() as HTMLElement[]
  const isInButton = path.find((ele) => {
    return ele.tagName?.toUpperCase() === 'BUTTON'
  })
  isInButton && e.stopPropagation()
}
</script>
