<template>
  <div :class="getClass" :style="getStyle">
    <div
      :class="`${prefixCls}-image-wrapper`"
      :style="getImageWrapperStyle"
      @click="openModal()"
    >
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img v-if="sourceValue" :src="sourceValue" alt="avatar" />
    </div>
    <Button
      v-if="showBtn"
      :class="`${prefixCls}-upload-btn`"
      v-bind="btnProps"
      @click="openModal"
    >
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </Button>

    <CropperModal
      :upload-api="uploadApi"
      :src="sourceValue"
      :size="size"
      @register="register"
      @upload-success="handleUploadSuccess"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, unref, watch, watchEffect } from 'vue'
import { useI18n } from '@zkj/vue3locale'
import CropperModal from './CropperModal.vue'
import { useModal } from '../../Modal'
import { Icon } from '../../Icon'
import type { CSSProperties, PropType } from 'vue'
import type { ButtonProps } from '../../Button'

defineOptions({ name: 'CropperAvatar' })

const props = defineProps({
  width: { type: [String, Number], default: '200px' },
  value: { type: String },
  showBtn: { type: Boolean, default: true },
  btnProps: { type: Object as PropType<ButtonProps> },
  btnText: { type: String, default: '' },
  uploadApi: {
    type: Function as PropType<
      ({ file, name }: { file: Blob; name: string }) => Promise<void>
    >,
  },

  size: { type: Number, default: 5 },
})

const emit = defineEmits(['update:value', 'change', 'message'])

const sourceValue = ref(props.value || '')
const prefixCls = 'cropper-avatar'
const [register, { openModal, closeModal }] = useModal()
const { t } = useI18n()

const getClass = computed(() => [prefixCls])

const getWidth = computed(() => `${`${props.width}`.replace(/px/, '')}px`)

const getIconWidth = computed(
  () => `${parseInt(`${props.width}`.replace(/px/, '')) / 2}px`
)

const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }))

const getImageWrapperStyle = computed(
  (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) })
)

watchEffect(() => {
  sourceValue.value = props.value || ''
})

watch(
  () => sourceValue.value,
  (v: string) => {
    emit('update:value', v)
  }
)

function handleUploadSuccess({ source, data }: any) {
  sourceValue.value = source
  emit('change', { source, data })
  emit('message', {
    type: 'success',
    content: t('component.cropper.uploadSuccess'),
  })
}

defineExpose({ openModal: openModal.bind(null, true), closeModal })
</script>
