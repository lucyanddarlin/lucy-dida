<script setup lang="ts">
import { NDropdown, NPopover } from "naive-ui";
import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";

const settingOptions: DropdownMixedOption[] = [
  {
    label: "设置",
    key: "settings",
    props: {
      onClick: () => {
        console.log("settings label");
      }
    }
  }
];
</script>

<template>
  <div class="w-48px border-r border-blue border-solid py-2 dark:bg-black">
    <NDropdown placement="right-end" :options="settingOptions">
      <!-- avatar -->
      <div class="w-32px h-32px rounded-sm bg-blue mx-auto">
        <img src="" alt="" />
      </div>
    </NDropdown>
    <!-- page router -->
    <NPopover placement="right">
      <template #trigger>
        <div class="hover:text-gray-6 dark:hover:text-gray-2"></div>
      </template>
    </NPopover>
  </div>
</template>
