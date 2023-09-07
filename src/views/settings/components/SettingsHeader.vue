<script setup lang="ts">
import { useGoto } from '@/composables/goto'

const { gotoHome } = useGoto()
</script>

<template>
  <div w-full flex justify-between items-center mb-20px>
    <div class="base-text text-30px font-600">设置</div>
    <div
      class="text-#aaa hover:text-#333 dark:hover:text-white select-none cursor-pointer transition-colors duration-300"
      @click="gotoHome"
    >
      回到首页
    </div>
  </div>
</template>
