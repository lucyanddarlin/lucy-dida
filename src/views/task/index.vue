<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useTaskLeftMenu } from '@/composables/taskLeftMenu'
import { useListProjectStore } from '@/stores/listProject'
import { useDrag } from '@/composables/drag'
import TaskLeftListView from './components/TaskLeftListView.vue'
import type { Ref } from 'vue'

const { taskLeftMenuVisible } = useTaskLeftMenu()
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

function useRightDrag(el: Ref<HTMLDivElement | undefined>) {
  const rightWidth = ref<number>(240)
  const rightWidthStyle = computed(() => {
    return `flex: 0 0 ${rightWidth.value}px`
  })

  onMounted(() => {
    const x = el.value!.getBoundingClientRect().x || 0

    useDrag({
      el: el.value!,
      moveRange: [x - 400, x],
      onMove(moveDistance) {
        rightWidth.value -= moveDistance
      }
    })
  })
  return {
    rightWidthStyle
  }
}

const leftResizeElement = ref<HTMLDivElement>()
const rightResizeElement = ref<HTMLDivElement>()
const { leftWidthStyle } = useLeftDrag(leftResizeElement)
const { rightWidthStyle } = useRightDrag(rightResizeElement)
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
    <div class="flex-1 flex w-full h-full p-24px min-w-300px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeElement"
      class="border-solid cursor-col-resize h-screen border-l-2px opacity-60 hover:opacity-100 transition-opacity duration-300"
      style="flex: 0 0 6px"
      title="收缩任务栏"
    />
    <div :style="rightWidthStyle">task edit</div>
  </div>
</template>
