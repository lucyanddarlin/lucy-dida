<script setup lang="ts">
import { ref, watch } from 'vue'
import { generate } from '@ant-design/colors'
import {
  type GlobalThemeOverrides,
  NButton,
  NCard,
  NCol,
  NColorPicker,
  NConfigProvider,
  NDivider,
  NForm,
  NFormItem,
  NRow,
  NSpace
} from 'naive-ui'
import type { CommonColors } from '@/types'

// 默认主题色
const primaryColor = ref('#52c41a')
// 默认 theme-override
const themeOverride = ref<GlobalThemeOverrides>({})
// @ant-design-colors 生成的颜色
const generateColors = ref<string[]>([])

/**
 * 根据 primaryColor 生成对应的主题色
 */
const setThemeOverride = () => {
  generateColors.value = generate(primaryColor.value)
  const commonColors: CommonColors = {
    primaryColor: generateColors.value[5],
    primaryColorHover: generateColors.value[4],
    primaryColorSuppl: generateColors.value[4],
    primaryColorPressed: generateColors.value[6]
  }
  themeOverride.value.common = commonColors
}

setThemeOverride()

// 监听主题色变化
watch(primaryColor, () => {
  setThemeOverride()
})
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverride">
    <NCard>
      <NRow gutter="12">
        <NForm inline>
          <NCol :span="4">
            <NFormItem label="Primary Color">
              <NColorPicker v-model:value="primaryColor" :show-alpha="false" />
            </NFormItem>
          </NCol>
        </NForm>
      </NRow>
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
  </NConfigProvider>
</template>
