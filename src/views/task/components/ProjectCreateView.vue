<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPopover,
  NSpace
} from 'naive-ui'
import { computed, ref } from 'vue'
import { useListProjectStore } from '@/stores/listProject'
import { useProjectCreateView } from './projectCreateView'

type Action = 'close' | 'cancel' | 'confirm'

const props = defineProps({
  show: { type: Boolean }
})
const emits = defineEmits([
  'update:show',
  'close',
  'closed',
  'cancel',
  'confirm'
])
const modalVisible = computed({
  get() {
    return props.show
  },
  set(val) {
    emits('update:show', val)
  }
})

const listProjectStore = useListProjectStore()
const inputElement = ref<HTMLInputElement>()
const {
  canSave,
  formValue,
  formRules,
  popoverVisible,
  isHover,
  handleMouseOver,
  handleMouseLeave
} = useProjectCreateView(inputElement)

/**
 * 处理事件
 * @param action
 */
const handleActions = (action: Action) => {
  modalVisible.value = false
}

/**
 * project 保存事件
 */
const handleSave = () => {
  const projectName = formValue.value.projectName
  listProjectStore.createProject(projectName)
  handleActions('confirm')
}
</script>

<template>
  <NModal v-model:show="modalVisible">
    <NCard
      style="width: 600px"
      size="huge"
      role="dialog"
      aria-modal="true"
      :bordered="false"
    >
      <template #header>
        <div class="flex font-bold" justify-center>添加清单</div>
      </template>
      <div @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <NForm :model="formValue" :rules="formRules">
          <NFormItem path="projectName">
            <NInput
              ref="inputElement"
              v-model:value="formValue.projectName"
              placeholder="名称"
            >
              <template #prefix>
                <NPopover
                  v-if="isHover"
                  :show="popoverVisible"
                  placement="bottom"
                  trigger="click"
                  :show-arrow="false"
                >
                  <template #trigger>
                    <NButton text @click="popoverVisible = !popoverVisible">
                      <template #icon>
                        <Icon icon="fa-solid:smile-wink" />
                      </template>
                    </NButton>
                  </template>
                  <span>emoji picker</span>
                </NPopover>
                <NButton v-else text>
                  <template #icon>
                    <Icon icon="ic:outline-menu" />
                  </template>
                </NButton>
              </template>
            </NInput>
          </NFormItem>
        </NForm>
      </div>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="handleActions('close')"> 关闭 </NButton>
          <NButton type="primary" :disabled="!canSave" @click="handleSave">
            保存
          </NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>
