<script setup lang="ts">
import { NModal } from 'naive-ui'
import { useCommandModal } from './commandModal'
import CommandModalBody from './CommandModelBody.vue'

const { commandModalVisible, registerKeyboardShortcut } = useCommandModal()
registerKeyboardShortcut()
</script>

<template>
  <div>
    <NModal v-model:show="commandModalVisible" display-directive="show">
      <CommandModalBody />
    </NModal>
  </div>
</template>
