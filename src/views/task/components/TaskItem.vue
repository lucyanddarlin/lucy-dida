<script setup lang="ts">
import { NPopover } from 'naive-ui'
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'
import { type Task, TaskStatus } from '@/types/task'
import type { Ref } from 'vue'

interface Props {
  task: Task
  dragIconVisible: boolean
}
const props = defineProps<Props>()

const taskStore = useTaskStore()

const checkBoxColors: Record<TaskStatus, string> = {
  [TaskStatus.ACTIVE]: 'bg-transparent',
  [TaskStatus.COMPLETE]: 'bg-#007A78',
  [TaskStatus.REMOVE]: 'bg-#ccc',
}
const taskEditRef: Ref<HTMLDivElement | undefined> = ref()

function handleInput(e: Event, task: Task) {
  const newTitle = (e.target as HTMLElement).textContent!
  taskStore.updateTaskTitle(task, newTitle)
}

function handleClickItem(task: Task) {
  taskStore.changeActiveTask(task)
}
</script>

<template>
  <div :data-id="props.task.id" class="flex flex-row w-full items-center">
    <i
      v-if="true"
      class="cursor-move text-gray dark:text-white flex-shrink-0 opacity-70 hover:opacity-100 transition duration-300 i-mdi-format-align-justify"
    />
    <i v-else class="w-1.2rem h-1.2rem flex-shrink-0" />
    <div
      class="flex-1 flex justify-start items-center gap-5px h-40px py-5px pl-10px rounded-6px dark:hover:bg-[#474747]/50 hover:bg-[#ECF1FF]/90 transition-colors duration-300"
      :class="[taskStore.currentActiveTask?.id === task.id ? 'activeTask' : '']"
    >
      <template v-if="task.status === TaskStatus.REMOVE">
        <!-- 临时 废纸篓 提示 -->
        <div class="flex justify-start items-center gap-5px">
          <NPopover trigger="hover">
            <template #trigger>
              <button
                class="w-5 h-5 rounded-1"
                :class="[checkBoxColors[task.status]]"
              />
            </template>
            <div>在废纸篓的 Task 是不可以直接被恢复..</div>
          </NPopover>
        </div>
        <div class="w-full base-text">{{ task.title }}</div>
        <!-- 临时 废纸篓 提示 -->
      </template>
      <template v-else>
        <button
          class="w-5 h-5 rounded-1 border-1 border-solid border-black opacity-20 dark:border-white hover:opacity-100 transition duration-300"
          :class="[checkBoxColors[task.status]]"
        />
        <div
          ref="taskEditRef"
          class="w-full base-text cursor-pointer focus:outline-0"
          contenteditable="true"
          @input="handleInput($event, task)"
          @focus="handleClickItem(task)"
          @keypress.enter="
            () => {
              taskEditRef?.blur()
            }
          "
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activeTask {
  @apply dark:bg-[#474747] bg-[#ECF1FF];
}
</style>
