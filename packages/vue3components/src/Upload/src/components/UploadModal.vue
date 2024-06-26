<template>
  <BasicModal
    width="800px"
    :title="t('component.upload.upload')"
    :ok-text="t('component.upload.save')"
    v-bind="$attrs"
    :close-func="handleCloseFunc"
    :mask-closable="false"
    :keyboard="false"
    class="upload-modal"
    :ok-button-props="getOkButtonProps"
    :cancel-button-props="{ disabled: isUploadingRef }"
    @register="register"
    @ok="handleOk"
  >
    <template #centerFooter>
      <a-button
        color="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef"
        @click="handleStartUpload"
      >
        {{ getUploadBtnText }}
      </a-button>
    </template>

    <div class="upload-modal-toolbar">
      <Alert
        :message="getHelpText"
        type="info"
        banner
        class="upload-modal-toolbar__text"
      />

      <Upload
        :accept="getStringAccept"
        :multiple="multiple"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="upload-modal-toolbar__btn"
      >
        <a-button type="primary">
          {{ t('component.upload.choose') }}
        </a-button>
      </Upload>
    </div>
    <FileList
      v-model:dataSource="fileListRef"
      :columns="columns"
      :action-column="actionColumn"
      :open-drag="fileListOpenDrag"
      :drag-options="fileListDragOptions"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import { computed, ref, toRefs, unref } from 'vue'
import { Alert, Upload } from 'ant-design-vue'
// hooks
import { buildUUID, isFunction } from '@zkj/utils'
import { useI18n } from '@zkj/vue3locale'
import { useUploadType } from '../hooks/useUpload'
//   types
import { UploadResultStatus } from '../types/typing'
import { basicProps } from '../props'
import { createActionColumn, createTableColumns } from './data'
// utils
import { checkImgType, getBase64WithFile } from '../helper'
import FileList from './FileList.vue'
import { BasicModal, useModalInner } from '../../../Modal'
import type { FileItem } from '../types/typing'
import type { PropType } from 'vue'

const props = defineProps({
  ...basicProps,
  previewFileList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits(['change', 'register', 'delete', 'message'])

const columns = createTableColumns()
const actionColumn = createActionColumn(handleRemove)

// 是否正在上传
const isUploadingRef = ref(false)
const fileListRef = ref<FileItem[]>([])
const { accept, helpText, maxNumber, maxSize } = toRefs(props)

const { t } = useI18n()
const [register, { closeModal }] = useModalInner()

const { getStringAccept, getHelpText } = useUploadType({
  acceptRef: accept,
  helpTextRef: helpText,
  maxNumberRef: maxNumber,
  maxSizeRef: maxSize,
})

const getIsSelectFile = computed(() => {
  return (
    fileListRef.value.length > 0 &&
    !fileListRef.value.every(
      (item) => item.status === UploadResultStatus.SUCCESS
    )
  )
})

const getOkButtonProps = computed(() => {
  const someSuccess = fileListRef.value.some(
    (item) => item.status === UploadResultStatus.SUCCESS
  )
  return {
    disabled:
      isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
  }
})

const getUploadBtnText = computed(() => {
  const someError = fileListRef.value.some(
    (item) => item.status === UploadResultStatus.ERROR
  )
  return isUploadingRef.value
    ? t('component.upload.uploading')
    : someError
    ? t('component.upload.reUploadFailed')
    : t('component.upload.startUpload')
})

// 上传前校验
function beforeUpload(file: File) {
  const { size, name } = file
  const { maxSize } = props
  // 设置最大值，则判断
  if (maxSize && file.size / 1024 / 1024 >= maxSize) {
    emit('message', {
      type: 'error',
      content: t('component.upload.maxSizeMultiple', [maxSize]),
    })
    return false
  }

  const commonItem = {
    uuid: buildUUID(),
    file,
    size,
    name,
    percent: 0,
    type: name.split('.').pop(),
  }
  // 生成图片缩略图
  if (checkImgType(file)) {
    // beforeUpload，如果异步会调用自带上传方法
    // file.thumbUrl = await getBase64(file);
    getBase64WithFile(file).then(({ result: thumbUrl }) => {
      fileListRef.value = [
        ...unref(fileListRef),
        {
          thumbUrl,
          ...commonItem,
        },
      ]
    })
  } else {
    fileListRef.value = [...unref(fileListRef), commonItem]
  }
  return false
}

// 删除
function handleRemove(record: FileItem) {
  const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid)
  index !== -1 && fileListRef.value.splice(index, 1)
  emit('delete', record)
}

async function uploadApiByItem(item: FileItem) {
  const { api } = props
  if (!api || !isFunction(api)) {
    return console.warn('upload api must exist and be a function')
  }
  try {
    item.status = UploadResultStatus.UPLOADING
    const ret = await props.api?.(
      {
        data: {
          ...(props.uploadParams || {}),
        },
        file: item.file,
        name: props.name,
        filename: props.filename,
      },
      (progressEvent: ProgressEvent) => {
        const complete =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0
        item.percent = complete
      }
    )
    const { data } = ret
    item.status = UploadResultStatus.SUCCESS
    item.response = data
    return {
      success: true,
      error: null,
    }
  } catch (e) {
    console.log(e)
    item.status = UploadResultStatus.ERROR
    return {
      success: false,
      error: e,
    }
  }
}

// 点击开始上传
async function handleStartUpload() {
  const { maxNumber } = props
  if (
    (fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber
  ) {
    emit('message', {
      type: 'warning',
      content: t('component.upload.maxNumber', [maxNumber]),
    })
    return
  }
  try {
    isUploadingRef.value = true
    // 只上传不是成功状态的
    const uploadFileList =
      fileListRef.value.filter(
        (item) => item.status !== UploadResultStatus.SUCCESS
      ) || []
    const data = await Promise.all(
      uploadFileList.map((item) => {
        return uploadApiByItem(item)
      })
    )
    isUploadingRef.value = false
    // 生产环境:抛出错误
    const errorList = data.filter((item: any) => !item.success)
    if (errorList.length > 0) throw errorList
  } catch (e) {
    isUploadingRef.value = false
    throw e
  }
}

//   点击保存
function handleOk() {
  const { maxNumber } = props

  if (fileListRef.value.length > maxNumber) {
    emit('message', {
      type: 'warning',
      content: t('component.upload.maxNumber', [maxNumber]),
    })
    return
  }
  if (isUploadingRef.value) {
    emit('message', {
      type: 'warning',
      content: t('component.upload.saveWarn'),
    })
  }
  const fileList: string[] = []

  for (const item of fileListRef.value) {
    const { status, response }: any = item
    if (status === UploadResultStatus.SUCCESS && response) {
      fileList.push(response.url)
    }
  }
  // 存在一个上传成功的即可保存
  if (fileList.length <= 0) {
    emit('message', {
      type: 'warning',
      content: t('component.upload.saveError'),
    })
    return
  }
  fileListRef.value = []
  closeModal()
  emit('change', fileList)
}

// 点击关闭：则所有操作不保存，包括上传的
async function handleCloseFunc() {
  if (!isUploadingRef.value) {
    fileListRef.value = []
    return true
  } else {
    emit('message', {
      type: 'warning',
      content: t('component.upload.uploadWait'),
    })
    return false
  }
}
</script>
