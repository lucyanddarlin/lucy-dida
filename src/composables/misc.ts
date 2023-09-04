import { computed } from 'vue'

export function useIsMac() {
  return computed(
    () => /(mac|iphone|ipod|ipad)/i.test(navigator.platform) || false
  )
}
