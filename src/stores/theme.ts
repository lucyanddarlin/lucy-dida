import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { Theme, Themes } from '@/composables/settings/theme'

export const useThemeStore = defineStore('themeStore', () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  const nativeTheme = computed(() => (isDark.value ? darkTheme : null))

  const currentThemeName = isDark.value ? Theme.Dark : Theme.Light
  const currentTheme = ref(
    Themes.find((item) => item.name === currentThemeName)
  )

  /* pixel value */
  const sideBarWidth = 48
  const taskLeftViewPadding = 10

  function changeTheme(theme: Theme) {
    const themeItem = Themes.find((item) => item.name === theme)
    if (themeItem) {
      themeItem.handler()
      currentTheme.value = themeItem
    }
  }

  useLocalStorage('isDark', true)

  return {
    isDark,
    currentTheme,
    currentThemeName,
    toggleDark,
    nativeTheme,
    sideBarWidth,
    taskLeftViewPadding,
    changeTheme
  }
})

let globalThemeStore: ReturnType<typeof useThemeStore>

// To avoid using store before initializing Pinia.
export const getGlobalThemeStore = () => {
  if (!globalThemeStore) {
    globalThemeStore = useThemeStore()
  }
  return globalThemeStore
}
