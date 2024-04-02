import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import {
  SmartProjectOptionValue,
  hideSmartProject,
  smartProjects,
} from '@/composables/settings/smartProject'

export const useSettingStore = defineStore('settingStore', () => {
  const settingsSmartProjects = reactive(smartProjects)
  const visibleSmartProjects = computed(() => {
    return settingsSmartProjects.filter((smartProject) => {
      return smartProject.option === SmartProjectOptionValue.VisiBle
    })
  })

  return {
    settingsSmartProjects,
    visibleSmartProjects,
    hideSmartProject,
  }
})
