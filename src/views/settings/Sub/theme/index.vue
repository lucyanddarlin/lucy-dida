<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { NButton, NColorPicker, NDivider, NSpace } from 'naive-ui'
import { useThemeStore } from '@/stores'
import SwitchTheme from '@/components/switchTheme/SwitchTheme.vue'

const { primaryColor, generateColors } = storeToRefs(useThemeStore())
const { setThemeOverride } = useThemeStore()

watch(primaryColor, () => {
  setThemeOverride()
})
</script>

<template>
  <div class="w-full p-20px">
    <div class="w-30% mb-20px base-text">
      <span>Select Primary Color</span>
      <NColorPicker v-model:value="primaryColor" :show-alpha="false" />
    </div>
    <NSpace>
      <span class="base-text">Light</span>
      <SwitchTheme />
      <span class="base-text">Dark</span>
    </NSpace>
    <NDivider />
    <NSpace>
      <NButton>Default</NButton>
      <NButton type="primary">Primary</NButton>
      <NButton strong secondary type="primary">secondary Primary</NButton>
      <NButton tertiary type="primary">tertiary primary</NButton>
      <NButton quaternary type="primary">quaternary primary</NButton>
      <NButton type="primary" ghost>ghost primary</NButton>
    </NSpace>
    <NDivider />
    <div
      v-for="(color, index) in generateColors"
      :key="index"
      :style="{ color }"
    >
      {{ color }}
    </div>
  </div>
</template>
