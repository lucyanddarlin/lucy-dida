<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useTaskLeftMenu } from '@/composables/taskLeftMenu'
import { useListProjectStore } from '@/stores/listProject'
import { useDrag } from '@/composables/drag'
import TaskLeftListView from './components/TaskLeftListView.vue'
import type { Ref } from 'vue'

const { taskLeftMenuVisible, toggleTaskLeftMenu } = useTaskLeftMenu()
const listProjectStore = useListProjectStore()

onBeforeMount(async () => {
  await listProjectStore.init()
})

function useLeftDrag(el: Ref<HTMLDivElement | undefined>) {
  const leftWidth = ref<number>(240)
  const leftWidthStyle = computed(() => {
    return `flex: 0 0 ${leftWidth.value}px`
  })

  onMounted(() => {
    const x = el.value?.getBoundingClientRect().x || 0

    useDrag({
      el: el.value!,
      moveRange: [x - 50, x + 150],
      onMove(moveDistance) {
        leftWidth.value += moveDistance
      }
    })
  })

  return {
    leftWidthStyle
  }
}

const leftResizeElement = ref<HTMLDivElement>()
const { leftWidthStyle } = useLeftDrag(leftResizeElement)
</script>

<template>
  <div class="h-[calc(100vh-40px)] flex base-color p-10px pt-0 overflow-hidden">
    <template v-if="taskLeftMenuVisible">
      <div :style="leftWidthStyle">
        <TaskLeftListView />
      </div>
      <div
        ref="leftResizeElement"
        class="border-solid cursor-col-resize h-screen border-l-2px opacity-60 hover:opacity-100 transition-opacity duration-300"
        style="flex: 0 0 6px"
        title="收缩任务栏"
      />
    </template>
    task
  </div>
</template>
