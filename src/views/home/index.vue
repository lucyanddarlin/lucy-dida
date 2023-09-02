<template>
  <div>
    <div>{{ countStore.count }}</div>
    <div>{{ countStore.doubleCount }}</div>
    <div @click="incrementCount">increment</div>
    <div>
      <ul>
        <li v-for="(i, index) in countList" :key="index">{{ i }}</li>
      </ul>
    </div>
    <div @click="pushCount">push</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores'

// const { count, doubleCount } = useCounterStore()
const countStore = useCounterStore()
const { incrementCount, countList, pushCount } = useCounterStore()
</script>

<style scoped></style>
