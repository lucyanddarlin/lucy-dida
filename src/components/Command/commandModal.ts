import { onMounted, onUnmounted, ref } from 'vue'
import { useIsMac } from '@/composables/misc'

// 是否显示 commandModal
const commandModalVisible = ref<boolean>(false)

export const useCommandModal = () => {
  /**
   * 开启 commandModal
   */
  function openCommandModal() {
    commandModalVisible.value = true
  }
  /**
   * 关闭 commandModal
   */
  function closeCommandModal() {
    commandModalVisible.value = false
  }

  /**
   * 配置 搜索面板 快捷键
   */
  function registerKeyboardShortcut() {
    // Windows: ctrl + k
    // MacOS: command + k
    const isMac = useIsMac()
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (isMac.value ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        if (commandModalVisible.value) {
          closeCommandModal()
        } else {
          openCommandModal()
        }
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', keydownHandler)
    })
    onUnmounted(() => {
      window.removeEventListener('keydown', keydownHandler)
    })
  }

  return {
    commandModalVisible,
    openCommandModal,
    closeCommandModal,
    registerKeyboardShortcut
  }
}
