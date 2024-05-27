<template>
  <Transfer
    :data-source="getdataSource"
    :filter-option="filterOption"
    :render="(item) => item.title"
    :show-select-all="showSelectAll"
    :selected-keys="selectedKeys"
    :target-keys="getTargetKeys"
    :show-search="showSearch"
    :disabled="disabled"
    @change="handleChange"
  />
</template>
<script lang="ts" setup>
import { computed, ref, unref, watch, watchEffect } from 'vue'
import { _get, isFunction, omit } from '@zkj/utils'
import {
  Transfer,
  type TransferDirection,
  type TransferItem,
} from '../../../Transfer'
import type { PropType } from 'vue'

defineOptions({ name: 'ApiTransfer' })

const props = defineProps({
  value: { type: Array as PropType<Array<string>> },
  api: {
    type: Function as PropType<(arg) => Promise<TransferItem[]>>,
    default: null,
  },
  params: { type: Object },
  dataSource: { type: Array as PropType<Array<TransferItem>> },
  immediate: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  alwaysLoad: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  afterFetch: { type: Function },
  resultField: {
    type: String as PropType<string>,
    default: '',
  },
  labelField: {
    type: String as PropType<string>,
    default: 'title',
  },
  valueField: {
    type: String as PropType<string>,
    default: 'key',
  },
  showSearch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  filterOption: {
    type: Function as PropType<
      (inputValue: string, item: TransferItem) => boolean
    >,
  },
  selectedKeys: {
    type: Array as PropType<Array<string>>,
  },
  showSelectAll: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  targetKeys: {
    type: Array as PropType<Array<string>>,
  },
})

const emit = defineEmits(['options-change', 'change'])

const _dataSource = ref<TransferItem[]>([])
const _targetKeys = ref<string[]>([])

const getdataSource = computed(() => {
  const { labelField, valueField } = props

  return unref(_dataSource).reduce((prev, next) => {
    if (next) {
      prev.push({
        ...omit(next, [labelField, valueField]),
        title: next[labelField],
        key: next[valueField],
      })
    }
    return prev
  }, [] as TransferItem[])
})
const getTargetKeys = computed<string[]>(() => {
  /* if (unref(_targetKeys).length > 0) {
          return unref(_targetKeys);
        } */
  if (Array.isArray(props.value)) {
    return props.value
  }
  if (Array.isArray(props.targetKeys)) {
    return props.targetKeys
  }
  return []
})

function handleChange(
  keys: string[],
  direction: TransferDirection,
  moveKeys: string[]
) {
  _targetKeys.value = keys
  console.log(direction)
  console.log(moveKeys)
  emit('change', keys)
}

watchEffect(() => {
  props.immediate && !props.alwaysLoad && fetch()
})

watch(
  () => props.params,
  () => {
    fetch()
  },
  { deep: true }
)

async function fetch() {
  const api = props.api
  if (!api || !isFunction(api)) {
    if (Array.isArray(props.dataSource)) {
      _dataSource.value = props.dataSource
    }
    return
  }
  _dataSource.value = []
  try {
    const res = await api(props.params)
    if (Array.isArray(res)) {
      _dataSource.value = res
      emitChange()
      return
    }
    if (props.resultField) {
      _dataSource.value = _get(res, props.resultField) || []
    }
    emitChange()
  } catch (error) {
    console.warn(error)
  }
}

function emitChange() {
  emit('options-change', unref(getdataSource))
}
</script>
