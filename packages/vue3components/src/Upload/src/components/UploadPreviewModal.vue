<template>
  <BasicModal
    width="800px"
    :title="t('component.upload.preview')"
    class="upload-preview-modal"
    v-bind="$attrs"
    :show-ok-btn="false"
    @register="register"
  >
    <FileList
      :data-source="fileListRef"
      :columns="columns"
      :action-column="actionColumn"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { downloadByUrl, isArray } from '@zkj/utils'
import { useI18n } from '@zkj/vue3locale'
import FileList from './FileList.vue'
import { previewProps } from '../props'
import { createPreviewActionColumn, createPreviewColumns } from './data'
import { BasicModal, useModalInner } from '../../../Modal'
import type { PreviewFileItem } from '../types/typing'

const props = defineProps(previewProps)

const emit = defineEmits(['list-change', 'register', 'delete'])

const columns = createPreviewColumns() as any[]
const actionColumn = createPreviewActionColumn({
  handleRemove,
  handleDownload,
}) as any

const [register] = useModalInner()
const { t } = useI18n()

const fileListRef = ref<PreviewFileItem[]>([])
watch(
  () => props.value,
  (value) => {
    if (!isArray(value)) value = []
    fileListRef.value = value
      .filter((item) => !!item)
      .map((item) => {
        return {
          url: item,
          type: item.split('.').pop() || '',
          name: item.split('/').pop() || '',
        }
      })
  },
  { immediate: true }
)

// 删除
function handleRemove(record: PreviewFileItem) {
  const index = fileListRef.value.findIndex((item) => item.url === record.url)
  if (index !== -1) {
    const removed = fileListRef.value.splice(index, 1)
    emit('delete', removed[0].url)
    emit(
      'list-change',
      fileListRef.value.map((item) => item.url)
    )
  }
}

// 下载
function handleDownload(record: PreviewFileItem) {
  const { url = '' } = record
  downloadByUrl({ url })
}
</script>
