<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { NPopover } from 'naive-ui'
import { useSmartProjectStore } from '@/stores/smartProject'
import { useTaskLeftListStore } from '@/stores/taskLeftList'
import { useSettingStore } from '@/stores/settings'
import type { SettingSmartProject } from '@/composables/settings/smartProject'
import type { SmartProjectName } from '@/types'

const smartProjectStore = useSmartProjectStore()
const settingStore = useSettingStore()
const taskLeftListStore = useTaskLeftListStore()

function useProjectMoreActions() {
  const showMoreIconIndex = ref<number>(-1)
  const showWitchPopover = ref<number>(-1)
  const openPopover = (key: number) => {
    showWitchPopover.value = key
  }

  return {
    showMoreIconIndex,
    showWitchPopover,
    openPopover
  }
}

const { showMoreIconIndex, showWitchPopover, openPopover } =
  useProjectMoreActions()

const handleTaskItemClick = (projectName: SmartProjectName) => {
  smartProjectStore.selectProject(projectName)
  taskLeftListStore.selectKey = projectName
}

const handleHideSmartProject = (project: SettingSmartProject) => {
  settingStore.hideSmartProject(project)
  showMoreIconIndex.value = -1
  showWitchPopover.value = -1
}
</script>

<template>
  <ul>
    <li
      v-for="(project, key) in settingStore.visibleSmartProjects"
      :key="key"
      base-text
      li-common
      pl-4
      pr-2
      select-none
      class="transition-colors duration-300 commonHover"
      :class="taskLeftListStore.selectKey === project.title ? 'active' : ''"
      @click="handleTaskItemClick(project.title)"
      @mouseenter="showMoreIconIndex = key"
      @mouseleave="showMoreIconIndex = -1"
    >
      <div flex>
        <Icon
          :icon="project.icon"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white-b"
        />
        <span ml-2>
          {{ project.title }}
        </span>
      </div>

      <NPopover
        trigger="click"
        style="padding: 5px 0px 5px 0px"
        :show="showWitchPopover === key"
        :show-arrow="false"
        placement="bottom"
        @clickoutside="showWitchPopover = -1"
      >
        <template #trigger>
          <Icon
            v-show="showMoreIconIndex === key"
            icon="material-symbols:more-horiz"
            width="20"
            class="color-[#9D9FA3]"
            dark="color-white"
            @click="
              ($event) => {
                $event.stopPropagation()
                openPopover(key)
              }
            "
          />
        </template>
        <ul w-180px cursor-pointer>
          <li
            hover="bg-[#F3F3F5] dark:bg-[#2D2D30]"
            pl-4
            text-14px
            h-20px
            lh-20px
            transition-colors
            duration-300
            @click="handleHideSmartProject(project)"
          >
            隐藏
          </li>
        </ul>
      </NPopover>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.commonHover {
  @apply hover:bg-[#eee] dark:hover:bg-[#2D2D30];
}

.active {
  @apply bg-[#eee] dark:bg-[#2D2D30];
}
</style>
