<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import {
  NButton,
  NCard,
  NCol,
  NColorPicker,
  NDivider,
  NForm,
  NFormItem,
  NRow,
  NSpace
} from 'naive-ui'
import { useThemeStore } from '@/stores'
import SwitchTheme from '@/components/switchTheme/SwitchTheme.vue'

const { primaryColor, generateColors } = storeToRefs(useThemeStore())
const { setThemeOverride } = useThemeStore()

watch(primaryColor, () => {
  setThemeOverride()
})
</script>

<template>
  <div class="setting-page w-full h-[calc(100vh-40px)] base-color">
    <NCard>
      <NRow gutter="12">
        <NForm inline>
          <NCol :span="4">
            <NFormItem label="Select Primary Color">
              <NColorPicker v-model:value="primaryColor" :show-alpha="false" />
            </NFormItem>
          </NCol>
        </NForm>
      </NRow>
      <NSpace>
        <span class="base-text-color">Light</span>
        <SwitchTheme />
        <span class="base-text-color">Dark</span>
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
    </NCard>
  </div>
</template>
