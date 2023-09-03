<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { NSpace, NSwitch } from 'naive-ui'
import { useThemeStore } from '@/stores'
import type { CSSProperties } from 'vue'

const { isDark } = storeToRefs(useThemeStore())

// switch 中 icon 的背景颜色
const switchBgColor = computed(() => (isDark.value ? '#000' : '#fff'))
// switch 轨道样式函数
const railStyle = ({ checked }: { checked: boolean }) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#323238'
    style.boxShadow = '0 0 0 1px rgba(82, 82, 89, .68)'
  } else {
    style.background = '#eeeef0'
    style.boxShadow = '0 0 0 1px #c2c2c4'
  }
  return style
}
</script>

<template>
  <div class="setting-theme">
    <NSpace>
      <NSwitch
        v-model:value="isDark"
        :rubber-band="false"
        :rail-style="railStyle"
      >
        <template #checked-icon>
          <div i="ph-moon" class="text-white text-12px"></div>
        </template>
        <template #unchecked-icon>
          <div i="ph-sun" class="text-#333 text-12px" />
        </template>
      </NSwitch>
    </NSpace>
  </div>
</template>

<style lang="scss" scoped>
.setting-theme :deep(.n-switch) {
  .n-switch__button {
    background-color: v-bind(switchBgColor);
  }
}
</style>
