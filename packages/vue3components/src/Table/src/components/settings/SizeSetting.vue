<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('component.table.settingDens') }}</span>
    </template>

    <Dropdown
      placement="bottom"
      :trigger="['click']"
      :get-popup-container="getPopupContainer"
    >
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu
          v-model:selectedKeys="selectedKeysRef"
          selectable
          @click="handleTitleClick"
        >
          <Menu.Item key="default">
            <span>{{ t('component.table.settingDensDefault') }}</span>
          </Menu.Item>
          <Menu.Item key="middle">
            <span>{{ t('component.table.settingDensMiddle') }}</span>
          </Menu.Item>
          <Menu.Item key="small">
            <span>{{ t('component.table.settingDensSmall') }}</span>
          </Menu.Item>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Dropdown, Menu, type MenuProps, Tooltip } from 'ant-design-vue'
import { useI18n } from '@zkj/vue3locale'
import { ColumnHeightOutlined } from '../../../../Icon'
import { useTableContext } from '../../hooks/useTableContext'
import { getPopupContainer } from '../../../../uitls'
import type { SizeType } from '../../types/table'

// import { useTableSettingStore } from '@/store/modules/tableSetting'

// const tableSettingStore = useTableSettingStore()

defineOptions({ name: 'SizeSetting' })

const table = useTableContext()
const { t } = useI18n()

const selectedKeysRef = ref<SizeType[]>([table.getSize()])

const handleTitleClick: MenuProps['onClick'] = ({ key }) => {
  selectedKeysRef.value = [key as SizeType]

  // tableSettingStore.setTableSize(key as SizeType)

  table.setProps({
    size: key as SizeType,
  })
}

onMounted(() => {
  // selectedKeysRef.value = [tableSettingStore.getTableSize]
  table.setProps({
    size: selectedKeysRef.value[0],
  })
})
</script>
