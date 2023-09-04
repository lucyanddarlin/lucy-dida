<script setup lang="ts">
import { openGithub } from '@/composables/goto'
import SwitchTheme from './switchTheme/SwitchTheme.vue'
</script>

<template>
  <div
    class="app-header w-full base-color h-40px px-1% flex justify-between items-center text-16px"
  >
    <div class="cursor-pointer select-none" aria-label="Go Home">Lucy-DiDa</div>
    <div class="flex justify-start items-center">
      <SwitchTheme class="mx-2" />
      <button class="common-icon">
        <div i="mdi-cog"></div>
      </button>
      <button class="common-icon" @click="openGithub">
        <div i="mdi-github"></div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  .common-icon {
    @apply mx-2 outline-none text-18px text-#aaa hover:text-black dark:hover:text-white transition duration-300;
  }
}
</style>
