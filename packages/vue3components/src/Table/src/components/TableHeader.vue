<template>
  <div :style="{ width: '100%' }">
    <div v-if="$slots.headerTop" :style="{ margin: '5px' }">
      <slot name="headerTop" />
    </div>
    <div v-if="showSelectionBar" :style="{ margin: '5px' }">
      <TableSelectionBar
        :clear-selected-row-keys="props.clearSelectedRowKeys!"
        :count="props.count"
      />
    </div>
    <div class="flex items-center">
      <slot v-if="$slots.tableTitle" name="tableTitle" />
      <TableTitle
        v-if="!$slots.tableTitle && title"
        :help-message="titleHelpMessage"
        :title="title"
      />
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar" />
        <Divider v-if="$slots.toolbar && showTableSetting" type="vertical" />
        <TableSettingComponent
          v-if="showTableSetting"
          :setting="tableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Divider } from 'ant-design-vue'
import TableSettingComponent from './settings/index.vue'
import TableTitle from './TableTitle.vue'
import TableSelectionBar from '../components/TableSelectionBar.vue'
import type { PropType } from 'vue'
import type {
  ColumnChangeParam,
  TableActionType,
  TableSetting,
} from '../types/table'

defineOptions({ name: 'BasicTableHeader' })

const props = defineProps({
  title: {
    type: [Function, String] as PropType<string | ((data) => string)>,
  },
  tableSetting: {
    type: Object as PropType<TableSetting>,
  },
  showTableSetting: {
    type: Boolean,
  },
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  //
  clearSelectedRowKeys: {
    type: Function as PropType<TableActionType['clearSelectedRowKeys']>,
  },
  count: {
    type: Number,
    default: 0,
  },
  showSelectionBar: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['columns-change'])
const prefixCls = 'basic-table-header'

function handleColumnChange(data: ColumnChangeParam[]) {
  emit('columns-change', data)
}
</script>
