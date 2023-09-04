<script setup lang="ts"></script>

<template>
  <div class="flex justify-between min-h-400px rounded-5px overflow-hidden">
    <div
      class="w-1/5 min-h-400px bg-white dark:bg-#1f1f1f transition-colors duration-300"
    >
      <SettingsSidebar />
    </div>
    <div
      class="w-4/5 min-h-400px bg-white dark:bg-#2e2e2e transition-colors duration-300"
    >
      <RouterView />
    </div>
  </div>
</template>
