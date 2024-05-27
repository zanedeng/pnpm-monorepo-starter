<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <BasicForm
      v-if="getBindValues.useSearchForm"
      ref="formRef"
      submit-on-reset
      v-bind="getFormProps"
      :table-action="tableAction"
      @register="registerForm"
      @submit="handleSearchInfoChange"
      @advanced-change="redoHeight"
    >
      <template
        v-for="item in getFormSlotKeys"
        #[replaceFormSlotKey(item)]="data"
      >
        <slot :name="item" v-bind="data || {}" />
      </template>
    </BasicForm>

    <Table
      v-show="getEmptyDataIsShowTable"
      ref="tableElRef"
      v-bind="getBindValues"
      :row-class-name="getRowClassName"
      @change="handleTableChange"
      @resize-column="setColumnWidth"
      @expand="handleTableExpand"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}" />
      </template>
      <template #headerCell="{ column }">
        <slot name="headerCell" v-bind="{ column }">
          <HeaderCell :column="column" />
        </slot>
      </template>
      <!-- 增加对antdv3.x兼容 -->
      <template #bodyCell="data">
        <slot name="bodyCell" v-bind="data || {}" />
      </template>
      <!--      <template #[`header-${column.dataIndex}`] v-for="(column, index) in columns" :key="index">-->
      <!--        <HeaderCell :column="column" />-->
      <!--      </template>-->
    </Table>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  inject,
  ref,
  toRaw,
  unref,
  useAttrs,
  useSlots,
  watchEffect,
} from 'vue'
import { Table } from 'ant-design-vue'
import { isFunction, omit } from '@zkj/utils'
import HeaderCell from './components/HeaderCell.vue'
import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useDataSource } from './hooks/useDataSource'
import { useLoading } from './hooks/useLoading'
import { useRowSelection } from './hooks/useRowSelection'
import { useTableScroll } from './hooks/useTableScroll'
import { useTableScrollTo } from './hooks/useScrollTo'
import { useCustomRow } from './hooks/useCustomRow'
import { useTableStyle } from './hooks/useTableStyle'
import { useTableHeader } from './hooks/useTableHeader'
import { useTableExpand } from './hooks/useTableExpand'
import { createTableContext } from './hooks/useTableContext'
import { useTableFooter } from './hooks/useTableFooter'
import { useTableForm } from './hooks/useTableForm'
import { basicProps } from './props'
import { BasicForm, useForm } from '../../Form'
import { PageWrapperFixedHeightKey } from './const'
import type {
  BasicTableProps,
  ColumnChangeParam,
  InnerHandlers,
  InnerMethods,
  SizeType,
  TableActionType,
} from './types/table'

defineOptions({ name: 'BasicTable' })

const props = defineProps(basicProps)

const emit = defineEmits([
  'fetch-success',
  'fetch-error',
  'selection-change',
  'register',
  'row-click',
  'row-dbClick',
  'row-contextmenu',
  'row-mouseenter',
  'row-mouseleave',
  'edit-end',
  'edit-cancel',
  'edit-row-end',
  'edit-change',
  'expanded-rows-change',
  'change',
  'columns-change',
])

const attrs = useAttrs()
const slots = useSlots()

const tableElRef = ref(null)
const tableData = ref([])
const wrapRef = ref(null)
const formRef = ref(null)
const innerPropsRef = ref<Partial<BasicTableProps>>()

const prefixCls = 'basic-table'
const [registerForm, formActions] = useForm()

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) } as BasicTableProps
})

const isFixedHeightPage = inject(PageWrapperFixedHeightKey, false)

watchEffect(() => {
  unref(isFixedHeightPage) &&
    props.canResize &&
    console.warn(
      "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)"
    )
})

const { getLoading, setLoading } = useLoading(getProps)
const {
  getPaginationInfo,
  getPagination,
  setPagination,
  setShowPagination,
  getShowPagination,
} = usePagination(getProps)

const {
  getRowSelection,
  getRowSelectionRef,
  getSelectRows,
  setSelectedRows,
  clearSelectedRowKeys,
  getSelectRowKeys,
  deleteSelectRowByKey,
  setSelectedRowKeys,
} = useRowSelection(getProps, tableData, emit)

const {
  handleTableChange: onTableChange,
  getDataSourceRef,
  getDataSource,
  getRawDataSource,
  setTableData,
  updateTableDataRecord,
  deleteTableDataRecord,
  insertTableDataRecord,
  findTableDataRecord,
  fetch,
  getRowKey,
  reload,
  getAutoCreateKey,
  updateTableData,
} = useDataSource(
  getProps,
  {
    tableData,
    getPaginationInfo,
    setLoading,
    setPagination,
    getFieldsValue: formActions.getFieldsValue,
    clearSelectedRowKeys,
  },
  emit
)

function handleTableChange(
  pagination: any,
  filters: any,
  sorter: any,
  extra: any
) {
  onTableChange(pagination, filters, sorter)
  emit('change', pagination, filters, sorter)
  // 解决通过useTable注册onChange时不起作用的问题
  const { onChange } = unref(getProps)
  onChange &&
    isFunction(onChange) &&
    onChange(pagination, filters, sorter, extra)
}

const {
  getViewColumns,
  getColumns,
  setCacheColumnsByField,
  setCacheColumns,
  setColumnWidth,
  setColumns,
  getColumnsRef,
  getCacheColumns,
} = useColumns(getProps, getPaginationInfo)

const { getScrollRef, redoHeight } = useTableScroll(
  getProps,
  tableElRef,
  getColumnsRef,
  getRowSelectionRef,
  getDataSourceRef,
  wrapRef,
  formRef
)

const { scrollTo } = useTableScrollTo(tableElRef, getDataSourceRef)

const { customRow } = useCustomRow(getProps, {
  setSelectedRowKeys,
  getSelectRowKeys,
  clearSelectedRowKeys,
  getAutoCreateKey,
  emit,
})

const { getRowClassName } = useTableStyle(getProps, prefixCls)

const {
  getExpandOption,
  expandAll,
  expandRows,
  collapseRows,
  collapseAll,
  handleTableExpand,
} = useTableExpand(getProps, tableData, emit)

const handlers: InnerHandlers = {
  onColumnsChange: (data: ColumnChangeParam[]) => {
    emit('columns-change', data)
    // support useTable
    unref(getProps).onColumnsChange?.(data)
  },
}

const methods: InnerMethods = {
  clearSelectedRowKeys,
  getSelectRowKeys,
}

const { getHeaderProps } = useTableHeader(getProps, slots, handlers, methods)

const { getFooterProps } = useTableFooter(
  getProps,
  getScrollRef,
  tableElRef,
  getDataSourceRef
)

const {
  getFormProps,
  replaceFormSlotKey,
  getFormSlotKeys,
  handleSearchInfoChange,
} = useTableForm(getProps, slots, fetch, getLoading)

const getBindValues = computed(() => {
  const dataSource = unref(getDataSourceRef)
  let propsData: any = {
    ...attrs,
    customRow,
    ...unref(getProps),
    ...unref(getHeaderProps),
    scroll: unref(getScrollRef),
    loading: unref(getLoading),
    tableLayout: 'fixed',
    rowSelection: unref(getRowSelectionRef),
    rowKey: unref(getRowKey),
    columns: toRaw(unref(getViewColumns)),
    pagination: toRaw(unref(getPaginationInfo)),
    dataSource,
    footer: unref(getFooterProps),
    ...unref(getExpandOption),
  }
  // if (slots.expandedRowRender) {
  //   propsData = omit(propsData, 'scroll');
  // }

  propsData = omit(propsData, ['class', 'onChange'])
  return propsData
})

const getWrapperClass = computed(() => {
  const values = unref(getBindValues)
  return [
    prefixCls,
    attrs.class,
    {
      [`${prefixCls}-form-container`]: values.useSearchForm,
      [`${prefixCls}--inset`]: values.inset,
    },
  ]
})

const getEmptyDataIsShowTable = computed(() => {
  const { emptyDataIsShowTable, useSearchForm } = unref(getProps)
  if (emptyDataIsShowTable || !useSearchForm) {
    return true
  }
  return !!unref(getDataSourceRef).length
})

function setProps(props: Partial<BasicTableProps>) {
  innerPropsRef.value = { ...unref(innerPropsRef), ...props }
}

const tableAction: TableActionType = {
  reload,
  getSelectRows,
  setSelectedRows,
  clearSelectedRowKeys,
  getSelectRowKeys,
  deleteSelectRowByKey,
  setPagination,
  setTableData,
  updateTableDataRecord,
  deleteTableDataRecord,
  insertTableDataRecord,
  findTableDataRecord,
  redoHeight,
  setSelectedRowKeys,
  setColumns,
  setLoading,
  getDataSource,
  getRawDataSource,
  setProps,
  getRowSelection,
  getPaginationRef: getPagination,
  getColumns,
  getCacheColumns,
  emit,
  updateTableData,
  setShowPagination,
  getShowPagination,
  setCacheColumnsByField,
  expandAll,
  collapseAll,
  expandRows,
  collapseRows,
  scrollTo,
  getSize: () => {
    return unref(getBindValues).size as SizeType
  },
  setCacheColumns,
}
createTableContext({ ...tableAction, wrapRef, getBindValues })

emit('register', tableAction, formActions)

defineExpose({ tableElRef, ...tableAction })
</script>
