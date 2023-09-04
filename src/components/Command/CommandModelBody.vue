<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NEmpty, NInput } from 'naive-ui'
import { useSearch } from './useSearch'

const { search } = useSearch()
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <div class="flex items-center">
      <Icon icon="material-symbols:search" width="30" />
      <NInput
        v-model:value="search"
        clearable
        class="flex-1 ml-10px"
        placeholder="通过关键字搜, 或添加 '>' 前缀开启命令模式"
      />
    </div>
    <NEmpty description="搜索任务, 标签或查看命令">
      <template #icon />
    </NEmpty>
    <!-- TODO: 搜索任务或者搜索命令结果 -->
  </div>
</template>
