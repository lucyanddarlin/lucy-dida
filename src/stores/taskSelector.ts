import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TaskSelector } from '@/types'

export const useTaskSelectorStore = defineStore('taskSelector', () => {
  const currentSelector = ref<TaskSelector>()

  function setCurrentSelector(selector: TaskSelector): void {
    currentSelector.value = selector
  }
  return {
    currentSelector,
    setCurrentSelector
  }
})
