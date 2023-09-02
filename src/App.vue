<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores'

const route = useRoute()
const themeStore = useThemeStore()
</script>

<template>
  <NConfigProvider :theme="themeStore.nativeTheme">
    <RouterView />
  </NConfigProvider>
</template>

<style scoped></style>
