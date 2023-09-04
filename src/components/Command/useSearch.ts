import { ref } from 'vue'

export function useSearch() {
  const search = ref<string>('')
  return {
    search
  }
}
