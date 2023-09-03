import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDark, useLocalStorage, useStorage, useToggle } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { generate } from '@ant-design/colors'
import { Theme, Themes } from '@/composables/settings/theme'
import type { GlobalThemeOverrides } from 'naive-ui'
import type { CommonColors } from '@/types'

const defaultPrimaryColor = '#52c41a'
export const useThemeStore = defineStore('themeStore', () => {
  // 默认主题色
  const primaryColor = useStorage('primaryColor', defaultPrimaryColor)
  // 默认 theme-override
  const themeOverride = ref<GlobalThemeOverrides>({})
  // @ant-design-colors 生成的颜色
  const generateColors = ref<string[]>([])
  // 系统是否处于暗黑模式
  const isDark = useDark()
  // 修改暗黑模式
  const toggleDark = useToggle(isDark)
  // native 主题
  const nativeTheme = computed(() => (isDark.value ? darkTheme : null))

  // 当前的主题
  const currentThemeName = isDark.value ? Theme.Dark : Theme.Light
  // 当前主题 Item
  const currentTheme = ref(
    Themes.find((item) => item.name === currentThemeName)
  )

  /* pixel value */
  const sideBarWidth = 48
  const taskLeftViewPadding = 10

  /**
   * 修改主题
   * @param theme
   */
  function changeTheme(theme: Theme) {
    const themeItem = Themes.find((item) => item.name === theme)
    if (themeItem) {
      themeItem.handler()
      currentTheme.value = themeItem
    }
  }

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
    themeOverride.value.Button = {
      textColorPrimary: '#fff',
      textColorHoverPrimary: '#fff',
      textColorPressedPrimary: '#fff',
      textColorFocusPrimary: '#fff',
      textColorDisabledPrimary: '#fff'
    }
  }

  useLocalStorage('isDark', isDark)

  return {
    isDark,
    currentTheme,
    currentThemeName,
    generateColors,
    primaryColor,
    toggleDark,
    nativeTheme,
    themeOverride,
    sideBarWidth,
    taskLeftViewPadding,
    changeTheme,
    setThemeOverride
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
