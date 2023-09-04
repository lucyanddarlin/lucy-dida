<script setup lang="ts">
import SettingsBody from './components/SettingsBody.vue'
import SettingsHeader from './components/SettingsHeader.vue'
</script>

<template>
  <div class="w-full h-[calc(100vh-40px)] base-color">
    <div class="w-1000px my-0 mx-auto">
      <SettingsHeader />
      <SettingsBody />
    </div>
  </div>
</template>
