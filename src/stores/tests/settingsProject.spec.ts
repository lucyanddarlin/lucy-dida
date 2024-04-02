import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  hideSmartProject,
  smartProjects,
} from '@/composables/settings/smartProject'
import { useSettingStore } from '../settings'

describe('setting project', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should all visible smart project', () => {
    const settingStore = useSettingStore()

    expect(settingStore.visibleSmartProjects.length).toBe(2)
  })

  it('should hide the target smart project', () => {
    const settingStore = useSettingStore()
    hideSmartProject(smartProjects[0])

    expect(settingStore.visibleSmartProjects.length).toBe(1)
  })
})
