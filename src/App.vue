<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import BaseLayout from '@/layout/BaseLayout.vue'
import { useThemeStore } from './stores'

const themeStore = useThemeStore()
themeStore.setThemeOverride()
</script>

<template>
  <NConfigProvider
    :theme="themeStore.nativeTheme"
    :theme-overrides="themeStore.themeOverride"
  >
    <BaseLayout>
      <RouterView />
    </BaseLayout>
  </NConfigProvider>
</template>

<style scoped></style>
