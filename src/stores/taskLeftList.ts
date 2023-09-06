import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import { watchOnce } from '@vueuse/core'
import { useListProjectStore } from './listProject'

interface Node {
  name: string
}

export const useTaskLeftListStore = defineStore('taskLeftList', () => {
  const listProjectStore = useListProjectStore()
  const listProjectRootNode: Node = {
    name: '清单'
  }

  const selectKey = ref<string>('')
  const listProjectChildrenNodes = ref<Array<Node>>([])

  // 转换 listProject
  watchEffect(() => {
    listProjectChildrenNodes.value = listProjectStore.projects.map((p) => {
      return {
        name: p.name
      }
    })
  })

  // 初始化的默认选择
  watchOnce(
    () => listProjectChildrenNodes.value,
    (value) => {
      selectKey.value = value[0]?.name || ''
    }
  )

  // 当更新列表清单时, 同步 selectKey
  watch(
    () => listProjectChildrenNodes.value,
    (newValue, oldValue) => {
      if (oldValue.length === 0) return
      if (newValue.length > oldValue.length) {
        selectKey.value = newValue[newValue.length - 1].name
      } else if (newValue.length < oldValue.length) {
        selectKey.value = newValue[0].name
      }
    }
  )

  watch(selectKey, (newValue, oldValue) => {
    // 当点击 rootNode 的时候不应该改变选择的 project
    if (newValue === listProjectRootNode.name) {
      selectKey.value = oldValue
    } else {
      listProjectStore.selectProject(newValue)
    }
  })

  return {
    selectKey,
    listProjectRootNode,
    listProjectChildrenNodes
  }
})
