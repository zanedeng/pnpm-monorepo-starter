<template>
  <div>
    <Space>
      <a-button
        type="primary"
        pre-icon="carbon:cloud-upload"
        @click="openUploadModal"
      >
        {{ t('component.upload.upload') }}
      </a-button>
      <Tooltip v-if="showPreview" placement="bottom">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <a-button @click="openPreviewModal">
          <Icon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </a-button>
      </Tooltip>
    </Space>
    <UploadModal
      v-bind="bindValue"
      :preview-file-list="fileList"
      :file-list-open-drag="fileListOpenDrag"
      :file-list-drag-options="fileListDragOptions"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, unref, useAttrs, watch } from 'vue'
import { Space, Tooltip } from 'ant-design-vue'
import { isArray, omit } from '@zkj/utils'
import { useI18n } from '@zkj/vue3locale'
import { uploadContainerProps } from './props'
import UploadModal from './components/UploadModal.vue'
import UploadPreviewModal from './components/UploadPreviewModal.vue'
import { Icon } from '../../Icon'
import { useModal } from '../../Modal'
import type { Recordable } from '@zkj/vue3types'

defineOptions({ name: 'BasicUpload' })

const props = defineProps(uploadContainerProps)

const emit = defineEmits(['change', 'delete', 'preview-delete', 'update:value'])

const attrs = useAttrs()
const { t } = useI18n()
// 上传modal
const [registerUploadModal, { openModal: openUploadModal }] = useModal()

//   预览modal
const [registerPreviewModal, { openModal: openPreviewModal }] = useModal()

const fileList = ref<string[]>([])

const showPreview = computed(() => {
  const { emptyHidePreview } = props
  if (!emptyHidePreview) return true
  return emptyHidePreview ? fileList.value.length > 0 : true
})

const bindValue = computed(() => {
  const value = { ...attrs, ...props }
  return omit(value, 'onChange')
})

watch(
  () => props.value,
  (value = []) => {
    fileList.value = isArray(value) ? value : []
  },
  { immediate: true }
)

// 上传modal保存操作
function handleChange(urls: string[]) {
  fileList.value = [...unref(fileList), ...(urls || [])]
  emit('update:value', fileList.value)
  emit('change', fileList.value)
}

// 预览modal保存操作
function handlePreviewChange(urls: string[]) {
  fileList.value = [...(urls || [])]
  emit('update:value', fileList.value)
  emit('change', fileList.value)
}

function handleDelete(record: Recordable<any>) {
  emit('delete', record)
}

function handlePreviewDelete(url: string) {
  emit('preview-delete', url)
}
</script>
