<template>
  <TreeSelect
    v-bind="getAttrs"
    :field-names="fieldNames"
    :load-data="async ? onLoadData : undefined"
    @change="handleChange"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
  </TreeSelect>
</template>
<script lang="ts" setup>
import {
  type PropType,
  computed,
  onMounted,
  ref,
  unref,
  useAttrs,
  watch,
} from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { _get, isArray, isFunction } from '@zkj/utils'
import { type Recordable } from '@zkj/vue3types'
import { LoadingOutlined } from '../../../Icon'

defineOptions({ name: 'ApiTreeSelect' })

const props = defineProps({
  api: {
    type: Function as PropType<(arg?: any) => Promise<Recordable<any>>>,
  },
  params: {
    type: Object,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  async: {
    type: Boolean,
    default: false,
  },
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
    default: 'value',
  },
  childrenField: {
    type: String as PropType<string>,
    default: 'children',
  },
})

const emit = defineEmits(['options-change', 'change', 'load-data'])

const attrs = useAttrs()
const treeData = ref<Recordable<any>[]>([])
const isFirstLoaded = ref<Boolean>(false)
const loading = ref(false)
const getAttrs = computed(() => {
  return {
    ...(props.api ? { treeData: unref(treeData) } : {}),
    ...attrs,
  }
})
const fieldNames = {
  children: props.childrenField,
  value: props.valueField,
  label: props.labelField,
}

function handleChange(...args) {
  emit('change', ...args)
}

watch(
  () => props.params,
  () => {
    !unref(isFirstLoaded) && fetch()
  },
  { deep: true }
)

watch(
  () => props.immediate,
  (v) => {
    v && !isFirstLoaded.value && fetch()
  }
)

onMounted(() => {
  props.immediate && fetch()
})

function onLoadData(treeNode) {
  return new Promise((resolve: (value?: unknown) => void) => {
    if (isArray(treeNode.children) && treeNode.children.length > 0) {
      resolve()
      return
    }
    emit('load-data', { treeData, treeNode, resolve })
  })
}

async function fetch() {
  const { api } = props
  if (!api || !isFunction(api) || loading.value) return
  loading.value = true
  treeData.value = []
  let result
  try {
    result = await api(props.params)
  } catch (e) {
    console.error(e)
  }
  loading.value = false
  if (!result) return
  if (!isArray(result)) {
    result = _get(result, props.resultField)
  }
  treeData.value = (result as Recordable<any>[]) || []
  isFirstLoaded.value = true
  emit('options-change', treeData.value)
}
</script>
