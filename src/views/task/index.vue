<script setup lang="ts">
import { useTaskLeftMenu } from '@/composables/taskLeftMenu'
import TaskLeftListView from './components/TaskLeftListView.vue'

const { taskLeftMenuVisible, toggleTaskLeftMenu } = useTaskLeftMenu()
</script>

<template>
  <div class="h-[calc(100vh-40px)] flex base-color p-10 pt-0 overflow-hidden">
    <template v-if="taskLeftMenuVisible">
      <div>
        <TaskLeftListView />
      </div>
      <div
        class="border-solid cursor-col-resize h-screen border-l-2px opacity-60 hover:opacity-100 transition-opacity duration-300"
        style="flex: 0 0 6px"
        title="收缩任务栏"
      />
    </template>
    task
  </div>
</template>
