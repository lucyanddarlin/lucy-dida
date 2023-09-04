import { ref } from 'vue'

export function useTaskLeftMenu() {
  const visible = ref<boolean>(true)

  function toggle() {
    visible.value = !visible.value
  }

  return { taskLeftMenuVisible: visible, toggleTaskLeftMenu: toggle }
}
