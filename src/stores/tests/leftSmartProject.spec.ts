import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it } from 'vitest'
import { useSettingStore } from '../settings'
import { useTaskSelectorStore } from '../taskSelector'

describe('left smart projects', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should set current selector', () => {
    const settingStore = useSettingStore()
    const taskSelector = useTaskSelectorStore()
  })
})
