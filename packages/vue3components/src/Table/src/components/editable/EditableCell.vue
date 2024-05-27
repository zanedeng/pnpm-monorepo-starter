<template>
  <div :class="prefixCls">
    <div
      v-show="!isEdit"
      :class="{
        [`${prefixCls}__normal`]: true,
        'ellipsis-cell': column.ellipsis,
      }"
      @click="handleEdit"
    >
      <div
        class="cell-content"
        :title="column.ellipsis ? getValues ?? '' : ''"
      />
      <EditOutlined
        v-if="!column.editRow && !getDisable"
        class="{`${this.prefixCls}__normal-icon`}"
      />
    </div>
    <Spin
      v-if="isEdit"
      :spinning="spinning"
      @click="(e) => e.stopPropagation()"
    >
      <ClickOutSide
        :class="`${prefixCls}__wrapper`"
        @click-outside="onClickOutside"
        @click="(e: any) => e.stopPropagation()"
      >
        <CellComponent
          v-bind="{ ...getComponentProps }"
          ref="elRef"
          :component="getComponent"
          :style="getWrapperStyle"
          :popover-visible="!!getRuleVisible"
          :rule="!!getRule"
          :rule-message="ruleMessage"
          :class="getWrapperClass"
          @change="handleChange"
          @options-change="handleOptionsChange"
          @press-enter="handleEnter"
        />
        <div v-if="!getRowEditable" :class="`${prefixCls}__action`">
          <CheckOutlined
            :class="[`${prefixCls}__icon`, 'mx-2']"
            @click="handleSubmitClick"
          />
          <CloseOutlined :class="`${prefixCls}__icon`" @click="handleCancel" />
        </div>
      </ClickOutSide>
    </Spin>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, toRaw, unref, watchEffect } from 'vue'
import { Spin } from 'ant-design-vue'
import {
  _set,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isString,
  pick,
  treeToList,
} from '@zkj/utils'
import { CheckOutlined, CloseOutlined, EditOutlined } from '../../../../Icon'
import { CellComponent } from './CellComponent'
import { useTableContext } from '../../hooks/useTableContext'
import { createPlaceholderMessage } from './helper'
import { parseRowKey } from '../../helper'
import { ClickOutSide } from '../../../../clickOutside'
import type { Fn } from '@zkj/vue3hooks'
import type { CSSProperties, PropType } from 'vue'
import type { BasicColumn } from '../../types/table'

defineOptions({
  name: 'EditableCell',
})

const props = defineProps({
  value: {
    type: [String, Number, Boolean, Object] as PropType<
      string | number | boolean | Record<string, any>
    >,
    default: '',
  },
  record: {
    type: Object as any,
  },
  column: {
    type: Object as PropType<BasicColumn>,
    default: () => ({}),
  },
  index: {
    type: Number,
  },
})

const table = useTableContext()
const isEdit = ref(false)
const elRef = ref()
const ruleVisible = ref(false)
const ruleMessage = ref('')
const optionsRef = ref<any[]>([])
const currentValueRef = ref<any>(props.value)
const defaultValueRef = ref<any>(props.value)
const spinning = ref<boolean>(false)

const prefixCls = 'editable-cell'

const getComponent = computed(() => props.column?.editComponent || 'Input')

const getRule = computed(() => props.column?.editRule)

const getRuleVisible = computed(() => {
  return unref(ruleMessage) && unref(ruleVisible)
})

const getIsCheckComp = computed(() => {
  const component = unref(getComponent)
  return ['Checkbox', 'Switch'].includes(component)
})

const getComponentProps = computed(() => {
  const isCheckValue = unref(getIsCheckComp)
  let compProps = props.column?.editComponentProps ?? ({} as any)
  const { checkedValue, unCheckedValue } = compProps

  const valueField = isCheckValue ? 'checked' : 'value'
  const val = unref(currentValueRef)

  let value = val
  if (isCheckValue) {
    if (typeof checkedValue !== 'undefined') {
      value = val === checkedValue ? checkedValue : unCheckedValue
    } else if (typeof unCheckedValue !== 'undefined') {
      value = val === unCheckedValue ? unCheckedValue : checkedValue
    } else {
      value = isNumber(val) || isBoolean(val) ? val : !!val
    }
  }

  const { record, column, index } = props

  if (isFunction(compProps)) {
    compProps = compProps({ text: val, record, column, index }) ?? {}
  }

  // 用临时变量存储 onChange方法 用于 handleChange方法 获取，并删除原始onChange, 防止存在两个 onChange
  compProps.onChangeTemp = compProps.onChange
  delete compProps.onChange

  const component = unref(getComponent)
  const apiSelectProps: Record<string, any> = {}
  if (component === 'ApiSelect') {
    apiSelectProps.cache = true
  }
  upEditDynamicDisabled(record, column, value)
  return {
    size: 'small',
    getPopupContainer: () => unref(table?.wrapRef.value) ?? document.body,
    placeholder: createPlaceholderMessage(unref(getComponent)),
    ...apiSelectProps,
    ...compProps,
    [valueField]: value,
    disabled: unref(getDisable),
  } as any
})

function upEditDynamicDisabled(record: any, column: any, value: any) {
  if (!record) return false
  const { key, dataIndex } = column
  if (!key && !dataIndex) return
  const dataKey = (dataIndex || key) as string
  _set(record, dataKey, value)
}

const getDisable = computed(() => {
  const { editDynamicDisabled } = props.column
  let disabled = false
  if (isBoolean(editDynamicDisabled)) {
    disabled = editDynamicDisabled
  }
  if (isFunction(editDynamicDisabled)) {
    const { record } = props
    disabled = editDynamicDisabled({
      record,
      currentValue: currentValueRef.value,
    })
  }
  return disabled
})

const getValues = computed(() => {
  const { editValueMap } = props.column

  const value = unref(currentValueRef)

  if (editValueMap && isFunction(editValueMap)) {
    return editValueMap(value)
  }

  const component = unref(getComponent)
  if (!component.includes('Select') && !component.includes('Radio')) {
    return value
  }

  const options = unref(getComponentProps)?.options ?? (unref(optionsRef) || [])
  const option = options.find((item: any) => `${item.value}` === `${value}`)

  return option?.label ?? value
})

const getWrapperStyle = computed((): CSSProperties => {
  if (unref(getIsCheckComp) || unref(getRowEditable)) {
    return {}
  }
  return {
    width: 'calc(100% - 48px)',
  }
})

const getWrapperClass = computed(() => {
  const { align = 'center' } = props.column
  return `edit-cell-align-${align}`
})

const getRowEditable = computed(() => {
  const { editable } = props.record || {}
  return !!editable
})

watchEffect(() => {
  // defaultValueRef.value = props.value;
  currentValueRef.value = props.value
})

watchEffect(() => {
  const { editable } = props.column
  if (isBoolean(editable) || isBoolean(unref(getRowEditable))) {
    isEdit.value = !!editable || unref(getRowEditable)
  }
})

function handleEdit(e: Event) {
  e.stopPropagation()
  if (
    unref(getRowEditable) ||
    unref(props.column?.editRow) ||
    unref(getDisable)
  )
    return
  ruleMessage.value = ''
  isEdit.value = true
  nextTick(() => {
    const el = unref(elRef)
    el?.focus?.()
  })
}

async function handleChange(e: any) {
  const component = unref(getComponent)
  if (!e) {
    currentValueRef.value = e
  } else if (component === 'Checkbox') {
    currentValueRef.value = e.target.checked
  } else if (component === 'Switch') {
    currentValueRef.value = e
  } else if (e?.target && Reflect.has(e.target, 'value')) {
    currentValueRef.value = e.target.value
  } else if (isString(e) || isBoolean(e) || isNumber(e) || isArray(e)) {
    currentValueRef.value = e
  }
  const onChange = unref(getComponentProps)?.onChangeTemp
  // eslint-disable-next-line prefer-rest-params
  if (onChange && isFunction(onChange)) onChange(...arguments)

  table.emit?.('edit-change', {
    column: props.column,
    value: unref(currentValueRef),
    record: toRaw(props.record),
  })
  handleSubmitRule()
}

async function handleSubmitRule() {
  const { column, record } = props
  const { editRule } = column
  const currentValue = unref(currentValueRef)

  if (editRule) {
    if (isBoolean(editRule) && !currentValue && !isNumber(currentValue)) {
      ruleVisible.value = true
      const component = unref(getComponent)
      ruleMessage.value = createPlaceholderMessage(component)
      return false
    }
    if (isFunction(editRule)) {
      const res = await editRule(currentValue, record)
      if (res) {
        ruleMessage.value = res
        ruleVisible.value = true
        return false
      } else {
        ruleMessage.value = ''
        return true
      }
    }
  }
  ruleMessage.value = ''
  return true
}

async function handleSubmit(needEmit = true, valid = true) {
  if (valid) {
    const isPass = await handleSubmitRule()
    if (!isPass) return false
  }

  const { column, index, record } = props
  if (!record) return false
  const { key, dataIndex } = column
  const value = unref(currentValueRef)
  if (!key && !dataIndex) return

  const dataKey = (dataIndex || key) as string

  if (!record.editable) {
    const { getBindValues } = table

    const { beforeEditSubmit, columns, rowKey } = unref(getBindValues)

    const rowKeyParsed = parseRowKey(rowKey, record)

    if (beforeEditSubmit && isFunction(beforeEditSubmit)) {
      spinning.value = true
      const keys: string[] = columns
        .map((_column) => _column.dataIndex)
        .filter((field) => !!field) as string[]

      let result: any = true
      try {
        result = await beforeEditSubmit({
          record: pick(record, [rowKeyParsed, ...keys]),
          index,
          key: dataKey as string,
          value,
        })
      } catch (e) {
        result = false
      } finally {
        spinning.value = false
      }
      if (result === false) {
        return
      }
    }
  }
  _set(record, dataKey, value)
  defaultValueRef.value = value
  //const record = await table.updateTableData(index, dataKey, value);
  needEmit && table.emit?.('edit-end', { record, index, key: dataKey, value })
  isEdit.value = false
}

async function handleEnter() {
  if (props.column?.editRow) {
    return
  }
  handleSubmit()
}

function handleSubmitClick() {
  handleSubmit()
}

function handleCancel() {
  isEdit.value = false
  currentValueRef.value = defaultValueRef.value
  const { column, index, record } = props
  const { key, dataIndex } = column
  table.emit?.('edit-cancel', {
    record,
    index,
    key: dataIndex || key,
    value: unref(currentValueRef),
  })
}

function onClickOutside() {
  if (props.column?.editable || unref(getRowEditable)) {
    return
  }
  const component = unref(getComponent)

  if (component.includes('Input')) {
    handleCancel()
  }
}

// only ApiSelect or TreeSelect
function handleOptionsChange(options: any) {
  const { replaceFields } = unref(getComponentProps)
  const component = unref(getComponent)
  if (component === 'ApiTreeSelect') {
    const {
      title = 'title',
      value = 'value',
      children = 'children',
    } = replaceFields || {}
    let listOptions = treeToList(options, { children })
    listOptions = listOptions.map((item) => {
      return {
        label: item[title],
        value: item[value],
      }
    })
    optionsRef.value = listOptions
  } else {
    optionsRef.value = options
  }
}

function initCbs(cbs: 'submitCbs' | 'validCbs' | 'cancelCbs', handle: Fn) {
  if (props.record) {
    isArray(props.record[cbs])
      ? // eslint-disable-next-line vue/no-mutating-props
        props.record[cbs]?.push(handle)
      : // eslint-disable-next-line vue/no-mutating-props
        (props.record[cbs] = [handle])
  }
}

if (props.record) {
  initCbs('submitCbs', handleSubmit)
  initCbs('validCbs', handleSubmitRule)
  initCbs('cancelCbs', handleCancel)

  if (props.column.dataIndex) {
    // eslint-disable-next-line vue/no-mutating-props
    if (!props.record.editValueRefs) props.record.editValueRefs = {}
    // eslint-disable-next-line vue/no-mutating-props
    props.record.editValueRefs[props.column.dataIndex as any] = currentValueRef
  }

  // eslint-disable-next-line vue/no-mutating-props
  props.record.onCancelEdit = () => {
    isArray(props.record?.cancelCbs) &&
      props.record?.cancelCbs.forEach((fn: Function) => fn())
  }

  // eslint-disable-next-line vue/no-mutating-props
  props.record.onSubmitEdit = async () => {
    if (isArray(props.record?.submitCbs)) {
      if (!props.record?.onValid?.()) return
      const submitFns = props.record?.submitCbs || []
      submitFns.forEach((fn: Function) => fn(false, false))
      table.emit?.('edit-row-end')
      return true
    }
  }
}
</script>
