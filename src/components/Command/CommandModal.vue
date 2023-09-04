<script setup lang="ts">
import { NModal } from 'naive-ui'
import { useCommand } from './commandModal'
import CommandModalBody from './CommandModelBody.vue'

const { commandModalVisible, registerKeyboardShortcut } = useCommand()
registerKeyboardShortcut()
</script>

<template>
  <div>
    <NModal v-model:show="commandModalVisible" display-directive="show">
      <CommandModalBody />
    </NModal>
  </div>
</template>
