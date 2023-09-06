<script setup lang="ts">
import { NTree } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { computed, h, ref, watchEffect } from 'vue'
import { useTaskLeftListStore } from '@/stores/taskLeftList'
import type { TreeOption } from 'naive-ui'

const taskLeftListStore = useTaskLeftListStore()
const treeListProjectChildren = ref<Array<TreeOption>>([])
const showProjectCreateView = ref<boolean>(false)

const selectKey = computed({
  get() {
    return [taskLeftListStore.selectKey]
  },
  set(val) {
    taskLeftListStore.selectKey = val[0]
  }
})

const defaultExpandedKeys = [taskLeftListStore.listProjectRootNode.name]

/**
 * 生成 Root Node 后缀(icon)
 * @param onclick
 */
const createRootNodeSuffix = (onclick: (e: Event) => void) => {
  return () =>
    h(Icon, {
      icon: 'ic:baseline-plus',
      width: '20',
      class:
        'opacity-0 rounded-1 hover:bg-gray-2 transition-opacity duration-300',
      onclick
    })
}

watchEffect(() => {
  treeListProjectChildren.value =
    taskLeftListStore.listProjectChildrenNodes.map((p) => ({
      key: p.name,
      label: p.name,
      isLeaf: true
    }))
})

const data = ref<Array<any>>([
  {
    key: taskLeftListStore.listProjectRootNode.name,
    label: taskLeftListStore.listProjectRootNode.name,
    checkboxDisabled: false,
    isLeaf: false,
    children: treeListProjectChildren,
    suffix: createRootNodeSuffix((e: Event) => {
      e.stopPropagation()
      showProjectCreateView.value = true
    })
  }
])

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    class: option.placeholder ? 'placeholder' : ''
  }
}
</script>

<template>
  <NTree
    :selected-keys="selectKey"
    :default-expanded-keys="defaultExpandedKeys"
    :data="data"
    :node-props="nodeProps"
    block-line
    expand-on-click
  />
</template>

<style>
.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled).n-tree-node--pending {
  background-color: transparent;
}

.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected {
  background-color: var(--n-node-color-active);
}

.n-tree-node-wrapper .placeholder .n-tree-node-indent {
  display: none;
}

.n-tree-node-wrapper .placeholder .n-tree-node-switcher {
  display: none;
}

.n-tree-node-wrapper .placeholder {
  pointer-events: none;
  padding: 6px 8px;
  margin: 0 8px 0 20px;
  background-color: rgb(25, 25, 25, 0.03);
  border-radius: 4px;
}

.n-tree-node-wrapper .placeholder .n-tree-node-content__text {
  color: rgb(25, 25, 25, 0.4);
  font-size: 12px;
}

.dark .n-tree-node-wrapper .placeholder {
  background-color: rgb(59, 59, 59, 1);
}

.dark .placeholder .n-tree-node-content__text {
  color: rgba(156, 163, 175, 0.5);
}

.n-tree.n-tree--block-line
  .n-tree-node:not(.n-tree-node--disabled):hover
  .iconify {
  opacity: 1;
}
</style>
