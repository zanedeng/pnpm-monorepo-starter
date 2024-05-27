<template>
  <Select
    v-bind="$attrs"
    v-model:value="state"
    :options="getOptions"
    @dropdown-visible-change="handleFetch"
    @change="handleChange"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
    <template v-if="loading" #notFoundContent>
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </Select>
</template>

<script lang="ts" setup>
import { computed, ref, unref, watch } from 'vue'
import { _get, isEqual, isFunction, omit } from '@zkj/utils'
import { useI18n } from '@zkj/vue3locale'
import { LoadingOutlined } from '../../../Icon'
import { Select } from '../../../Select'
import { useRuleFormItem } from '../hooks/useFormItem'
import type { PropType } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/select'

type OptionsItem = {
  label?: string
  value?: string
  disabled?: boolean
  [name: string]: any
}

defineOptions({ name: 'ApiSelect', inheritAttrs: false })

const props = defineProps({
  value: { type: [Array, Object, String, Number] as PropType<SelectValue> },
  numberToString: {
    type: Boolean as PropType<boolean>,
  },
  api: {
    type: Function as PropType<(arg?: any) => Promise<OptionsItem[]>>,
    default: null,
  },
  // api params
  params: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  resultField: {
    type: String as PropType<string>,
    default: '',
  },
  labelField: {
    type: String as PropType<string>,
    default: 'label',
  },
  valueField: {
    type: String as PropType<string>,
    default: 'value',
  },
  immediate: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  alwaysLoad: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  options: {
    type: Array<OptionsItem>,
    default: [],
  },
})

const emit = defineEmits(['options-change', 'change', 'update:value'])

const optionsRef = ref<OptionsItem[]>([])

const loading = ref(false)
// 首次是否加载过了
const isFirstLoaded = ref(false)
const emitData = ref<OptionsItem[]>([])
const { t } = useI18n()

// Embedded in the form, just use the hook binding to perform form verification
const [state] = useRuleFormItem(props, 'value', 'change', emitData)

const getOptions = computed(() => {
  const { labelField, valueField, numberToString } = props

  const data = unref(optionsRef).reduce((prev, next: any) => {
    if (next) {
      const value = _get(next, valueField)
      prev.push({
        ...omit(next, [labelField, valueField]),
        label: _get(next, labelField),
        value: numberToString ? `${value}` : value,
      })
    }
    return prev
  }, [] as OptionsItem[])
  return data.length > 0 ? data : props.options
})

watch(
  () => state.value,
  (v) => {
    emit('update:value', v)
  }
)

watch(
  () => props.params,
  (value, oldValue) => {
    if (isEqual(value, oldValue)) return
    fetch()
  },
  { deep: true, immediate: props.immediate }
)

async function fetch() {
  const api = props.api
  if (!api || !isFunction(api) || loading.value) return
  optionsRef.value = []
  try {
    loading.value = true
    const res = await api(props.params)
    isFirstLoaded.value = true
    if (Array.isArray(res)) {
      optionsRef.value = res
      emitChange()
      return
    }
    if (props.resultField) {
      optionsRef.value = _get(res, props.resultField) || []
    }
    emitChange()
  } catch (error) {
    console.warn(error)
    // reset status
    isFirstLoaded.value = false
  } finally {
    loading.value = false
  }
}

async function handleFetch(visible: boolean) {
  if (visible) {
    if (props.alwaysLoad) {
      await fetch()
    } else if (!props.immediate && !unref(isFirstLoaded)) {
      await fetch()
    }
  }
}

function emitChange() {
  emit('options-change', unref(getOptions))
}

function handleChange(_, ...args) {
  emitData.value = args
}
</script>
