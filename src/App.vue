<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { generate } from '@ant-design/colors'
import TheHeader from './components/TheHeader.vue'
import { useThemeStore } from './stores'
import type { GlobalThemeOverrides } from 'naive-ui'

const colors = generate('#1890ff')

const primaryColor = colors[5] // 主色取第6个颜色，和传入的颜色一致
const primaryColorHover = colors[4] // Hover和Suppl颜色一样，取第5个颜色
const primaryColorSuppl = colors[4] // Hover和Suppl颜色一样，取第5个颜色
const primaryColorPressed = colors[6] // 比主色深一档，取第7个颜色

const themeStore = useThemeStore()

const themeOverride: GlobalThemeOverrides = {
  common: {
    primaryColor: 'red'
  }
}
</script>

<template>
  <NConfigProvider
    :theme="themeStore.nativeTheme"
    :theme-overrides="themeOverride"
  >
    <TheHeader />
    <RouterView />
  </NConfigProvider>
</template>

<style scoped></style>
