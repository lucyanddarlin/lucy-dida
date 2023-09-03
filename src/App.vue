<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import TheHeader from './components/TheHeader.vue'
import { useThemeStore } from './stores'

const themeStore = useThemeStore()
themeStore.setThemeOverride()
</script>

<template>
  <NConfigProvider
    :theme="themeStore.nativeTheme"
    :theme-overrides="themeStore.themeOverride"
  >
    <TheHeader />
    <RouterView />
  </NConfigProvider>
</template>

<style scoped></style>
