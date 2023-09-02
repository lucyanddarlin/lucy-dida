<template>
  <div>my test component</div>
  <div>{{ title }}</div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped></style>
