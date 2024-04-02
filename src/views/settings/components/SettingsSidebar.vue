<script setup lang="ts">
import { h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NMenu } from 'naive-ui'
import { sidebars } from '@/composables/settings/sider'
import type { MenuOption } from 'naive-ui'

const options: MenuOption[] = sidebars.map((sidebar) => ({
  label: () =>
    h(
      RouterLink,
      { to: `/settings${sidebar.path}` },
      { default: () => sidebar.title }
    ),
  key: sidebar.path.slice(1),
}))

const route = useRoute()

const getCurrentMenu = () => {
  const path = route.path
  const pathArr = path.split('/')
  return pathArr[pathArr.length - 1]
}
</script>

<template>
  <div class="base-text">
    <NMenu :options="options" :default-value="getCurrentMenu()" />
  </div>
</template>
