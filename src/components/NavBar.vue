<script setup lang="ts">
import { NDropdown, NPopover } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores'
import Command from '@/components/Command/CommandModal.vue'
import { useGoto } from '@/composables/goto'
import { useCommandModal } from './Command/commandModal'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

const { primaryColor } = storeToRefs(useThemeStore())

const { openCommandModal } = useCommandModal()

const { goToUserCenter } = useGoto()

const settingOptions: DropdownMixedOption[] = [
  {
    label: '设置',
    key: 'settings',
    props: {
      onClick: () => {
        console.log('settings label')
      },
    },
  },
]
</script>

<template>
  <div
    class="nav-bar w-48px border-solid py-2"
    :style="{ backgroundColor: primaryColor }"
  >
    <NDropdown placement="right-end" :options="settingOptions">
      <!-- avatar -->
      <div
        class="w-32px h-32px rounded-sm bg-white mx-auto cursor-pointer"
        @click="goToUserCenter"
      >
        <img src="" alt="" />
      </div>
    </NDropdown>
    <!-- page router -->
    <div
      class="text-#eee flex flex-col justify-center items-center text-xl mt-10 gap-6 font-bold"
    >
      <NPopover placement="right">
        <template #trigger>
          <div class="common-icon" i="carbon-checkbox-checked-filled" />
        </template>
        <span>任务</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div class="common-icon" i="carbon-calendar-heat-map" />
        </template>
        <span>日历</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div class="common-icon" i="carbon-task-complete" />
        </template>
        <span>打卡</span>
      </NPopover>
      <NPopover placement="right">
        <template #trigger>
          <div
            class="common-icon"
            i="carbon-search"
            @click="openCommandModal"
          />
        </template>
        <span>搜索面板</span>
      </NPopover>
    </div>
    <Command />
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  .common-icon {
    @apply hover:text-white transition-colors cursor-pointer duration-300;
  }
}
</style>
