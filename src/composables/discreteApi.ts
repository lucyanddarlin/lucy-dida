import { computed } from 'vue'
import {
  type ConfigProviderProps,
  createDiscreteApi,
  darkTheme
} from 'naive-ui'

const discreteConfigure = computed<ConfigProviderProps>(() => ({
  theme: darkTheme
}))

export const { loadingBar, message } = createDiscreteApi(
  ['loadingBar', 'message'],
  {
    configProviderProps: discreteConfigure
  }
)
