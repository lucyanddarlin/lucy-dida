<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NSelect } from 'naive-ui'
import { useSettingStore } from '@/stores/settings'

const settingStore = useSettingStore()
</script>

<template>
  <ul p-8>
    <li
      v-for="(project, key) in settingStore.settingsSmartProjects"
      :key="key"
      p="l-4 r-2"
      h-60px
      flex
      items-center
    >
      <div w-120px flex items-center>
        <Icon
          :icon="project.icon"
          width="20"
          class="color-[#9D9FA3]"
          dark="color-white-b"
        />
        <span ml-2>{{ project.title }}</span>
      </div>
      <div w-200px>
        <NSelect v-model:value="project.option" :options="project.options" />
      </div>
    </li>
  </ul>
</template>
