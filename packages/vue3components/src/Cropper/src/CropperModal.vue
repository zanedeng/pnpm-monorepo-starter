<template>
  <BasicModal
    v-bind="$attrs"
    :title="t('component.cropper.modalTitle')"
    width="800px"
    :can-fullscreen="false"
    :ok-text="t('component.cropper.okText')"
    @register="register"
    @ok="handleOk"
  >
    <div :class="prefixCls">
      <div :class="`${prefixCls}-left`">
        <div :class="`${prefixCls}-cropper`">
          <CropperImage
            v-if="src"
            :src="src"
            height="300px"
            :circled="circled"
            @cropend="handleCropend"
            @ready="handleReady"
          />
        </div>

        <div :class="`${prefixCls}-toolbar`">
          <Upload
            :file-list="[]"
            accept="image/*"
            :before-upload="handleBeforeUpload"
          >
            <Tooltip
              :title="t('component.cropper.selectImage')"
              placement="bottom"
            >
              <a-button
                size="small"
                pre-icon="ant-design:upload-outlined"
                type="primary"
              />
            </Tooltip>
          </Upload>
          <Space>
            <Tooltip
              :title="t('component.cropper.btn_reset')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="ant-design:reload-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('reset')"
              />
            </Tooltip>
            <Tooltip
              :title="t('component.cropper.btn_rotate_left')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="ant-design:rotate-left-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', -45)"
              />
            </Tooltip>
            <Tooltip
              :title="t('component.cropper.btn_rotate_right')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="ant-design:rotate-right-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', 45)"
              />
            </Tooltip>
            <Tooltip
              :title="t('component.cropper.btn_scale_x')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="vaadin:arrows-long-h"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleX')"
              />
            </Tooltip>
            <Tooltip
              :title="t('component.cropper.btn_scale_y')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="vaadin:arrows-long-v"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleY')"
              />
            </Tooltip>
            <Tooltip
              :title="t('component.cropper.btn_zoom_in')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="ant-design:zoom-in-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', 0.1)"
              />
            </Tooltip>
            <Tooltip
              :title="t('component.cropper.btn_zoom_out')"
              placement="bottom"
            >
              <a-button
                type="primary"
                pre-icon="ant-design:zoom-out-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', -0.1)"
              />
            </Tooltip>
          </Space>
        </div>
      </div>
      <div :class="`${prefixCls}-right`">
        <div :class="`${prefixCls}-preview`">
          <img
            v-if="previewSource"
            :src="previewSource"
            :alt="t('component.cropper.preview')"
          />
        </div>
        <template v-if="previewSource">
          <div :class="`${prefixCls}-group`">
            <Avatar :src="previewSource" size="large" />
            <Avatar :src="previewSource" :size="48" />
            <Avatar :src="previewSource" :size="64" />
            <Avatar :src="previewSource" :size="80" />
          </div>
        </template>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Avatar, Space, Tooltip, Upload } from 'ant-design-vue'
import { dataURLtoBlob, isFunction } from '@zkj/utils'
import { useI18n } from '@zkj/vue3locale'
import CropperImage from './Cropper.vue'
import { BasicModal, useModalInner } from '../../Modal'
import type { PropType } from 'vue'
import type { CropendResult, Cropper } from './typing'

type apiFunParams = { file: Blob; name: string; filename: string }

defineOptions({ name: 'CropperModal' })

const props = defineProps({
  circled: { type: Boolean, default: true },
  uploadApi: {
    type: Function as PropType<(params: apiFunParams) => Promise<any>>,
  },
  src: { type: String },
  size: { type: Number },
})

const emit = defineEmits(['uploadSuccess', 'uploadError', 'register'])

let filename = ''
const src = ref(props.src || '')
const previewSource = ref('')
const cropper = ref<Cropper>()
let scaleX = 1
let scaleY = 1

const { prefixCls } = useDesign('cropper-am')
const [register, { closeModal, setModalProps }] = useModalInner()
const { t } = useI18n()

// Block upload
function handleBeforeUpload(file: File) {
  if (props.size && file.size > 1024 * 1024 * props.size) {
    emit('uploadError', { msg: t('component.cropper.imageTooBig') })
    return false
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  src.value = ''
  previewSource.value = ''
  reader.onload = function (e) {
    src.value = (e.target?.result as string) ?? ''
    filename = file.name
  }
  return false
}

function handleCropend({ imgBase64 }: CropendResult) {
  previewSource.value = imgBase64
}

function handleReady(cropperInstance: Cropper) {
  cropper.value = cropperInstance
}

function handlerToolbar(event: string, arg?: number) {
  if (event === 'scaleX') {
    scaleX = arg = scaleX === -1 ? 1 : -1
  }
  if (event === 'scaleY') {
    scaleY = arg = scaleY === -1 ? 1 : -1
  }
  cropper?.value?.[event]?.(arg)
}

async function handleOk() {
  const uploadApi = props.uploadApi
  if (uploadApi && isFunction(uploadApi)) {
    const blob = dataURLtoBlob(previewSource.value)
    try {
      setModalProps({ confirmLoading: true })
      const result = await uploadApi({ name: 'file', file: blob, filename })
      emit('uploadSuccess', { source: previewSource.value, data: result.url })
      closeModal()
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
}
</script>
