import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

let id = 0
export const useCounterStore = defineStore('counter', () => {
  const count = ref<number>(0)
  const countList = ref<Array<number>>([-2, -1])
  const doubleCount = computed(() => count.value * 2)

  function incrementCount() {
    count.value++
  }

  function pushCount() {
    countList.value.push(id++)
  }

  return {
    count,
    doubleCount,
    countList,
    incrementCount,
    pushCount
  }
})
