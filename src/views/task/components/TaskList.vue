<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTaskLeftMenu } from '@/composables/taskLeftMenu'

const { taskLeftMenuVisible, toggleTaskLeftMenu } = useTaskLeftMenu()
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
    </div>
  </div>
</template>
