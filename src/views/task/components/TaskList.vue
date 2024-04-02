<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { useTaskLeftMenu } from '@/composables/taskLeftMenu'
import { useTaskSelectorStore } from '@/stores/taskSelector'
import { TaskSelectorType } from '@/types/task'
import { useTaskStore } from '@/stores/task'
import { isEmptyString } from '@/utils'
import TaskItem from './TaskItem.vue'
import type { Ref } from 'vue'

const { taskLeftMenuVisible, toggleTaskLeftMenu } = useTaskLeftMenu()
const taskSelectorStore = useTaskSelectorStore()
const taskStore = useTaskStore()

function useInput() {
  const inputRef: Ref<HTMLInputElement | null> = ref(null)

  function onFocus() {
    inputRef.value!.focus()
  }
  return {
    inputRef,
    onFocus,
  }
}

const taskTitle = ref<string>('')
const placeholderText = computed<string>(() => {
  return `添加任务至"${taskSelectorStore.currentSelector?.name}", 回车即可保存`
})
const placeholderVisible = computed<boolean>(() => {
  return taskTitle.value.length === 0
})
const taskInputVisible = computed(
  () =>
    taskSelectorStore.currentSelector?.type !== TaskSelectorType.smartProject
)

function handleInputChange(e: any) {
  taskTitle.value = e.target.value
}

const { onFocus, inputRef } = useInput()

function addTask() {
  if (isEmptyString(taskTitle.value)) return
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div class="flex items-center">
      <Icon
        icon="tabler:layout-sidebar-left-collapse"
        width="30"
        class="rotate-0 transition duration-500"
        :class="{ 'rotate-180': !taskLeftMenuVisible }"
        @click="toggleTaskLeftMenu"
      />
      <h1 text-4xl ml-5px>{{ taskSelectorStore.currentSelector?.name }}</h1>
    </div>
    <div
      v-show="taskInputVisible"
      class="relative cursor-text"
      @click="onFocus"
    >
      <input
        ref="inputRef"
        :value="taskTitle"
        type="text"
        class="w-100% min-w-300px h-38px rounded-6px p-4px pl-12px pr-12px outline-none border-1 b-transparent bg-#eee dark:bg-#3B3B3B transition-colors duration-300"
        @input="handleInputChange"
        @keypress.enter="addTask"
      />
      <div
        v-show="placeholderVisible"
        class="w-100% min-w-300px h-38px absolute top-0 flex items-center px-4px pl-12px pr-12px border-1 b-transparent select-none color-gray:50"
      >
        <Icon
          icon="ic:baseline-plus"
          width="20"
          class="color-gray:50 pr-4px box-content"
        />
        {{ placeholderText }}
      </div>
    </div>

    <TaskItem
      v-for="(task, key) in taskStore.tasks"
      :key="key"
      :task="task"
      drag-icon-visible
    />
  </div>
</template>
