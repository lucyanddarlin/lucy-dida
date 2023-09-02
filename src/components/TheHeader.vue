<script setup lang="ts">
import { openGithub } from '@/composables/goto'
</script>

<template>
  <div
    class="w-full base-color h-40px px-1% flex justify-between items-center text-16px"
  >
    <div class="cursor-pointer select-none" aria-label="Go Home">Lucy-DiDa</div>
    <div class="flex justify-start items-center">
      <button class="mx-2 !outline-none">
        <div i="carbon-settings"></div>
      </button>
      <button class="mx-2 !outline-none" @click="openGithub">
        <div i="mdi-github"></div>
      </button>
    </div>
  </div>
</template>
