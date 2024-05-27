<template>
  <ConfigProvider v-bind="$attrs"><slot /></ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
</script>
