<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div>
    <TheHeader />
    <div class="flex">
      <NavBar />
      <div class="grow">
        <slot />
      </div>
    </div>
  </div>
</template>
