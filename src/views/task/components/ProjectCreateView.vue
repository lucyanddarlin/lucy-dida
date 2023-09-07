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
import 'vue3-emoji-picker/css'
import EmojiPicker from 'vue3-emoji-picker'
import { useListProjectStore } from '@/stores/listProject'
import { useThemeStore } from '@/stores'
import { isNull } from '@/utils'
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
const themeStore = useThemeStore()
const inputElement = ref<HTMLInputElement>()
const {
  canSave,
  formValue,
  formRules,
  popoverVisible,
  isHover,
  emojiValue,
  handleMouseOver,
  handleMouseLeave,
  cleanInput,
  getDefaultEmojiConfig,
  handleSelectEmoji
} = useProjectCreateView(inputElement)

const { EMOJI_GROUPS_NAMES, EMOJI_STATIC_TEXTS } = getDefaultEmojiConfig()

/**
 * 处理事件
 * @param action
 */
const handleActions = (action: Action) => {
  modalVisible.value = false
  emits(action)
  cleanInput()
}

/**
 * project 保存事件
 */
const handleSave = () => {
  let projectName = formValue.value.projectName
  if (!isNull(emojiValue.value)) {
    projectName = emojiValue.value + projectName
  }
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
                        <span v-if="emojiValue">{{ emojiValue }}</span>
                        <Icon v-else icon="fa-solid:smile-wink" />
                      </template>
                    </NButton>
                  </template>
                  <EmojiPicker
                    picker-type="inputValue"
                    :native="true"
                    :theme="themeStore.isDark ? 'dark' : ''"
                    :group-names="EMOJI_GROUPS_NAMES"
                    :static-texts="EMOJI_STATIC_TEXTS"
                    @select="handleSelectEmoji"
                  />
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

<style lang="scss" scoped>
:deep(.v-binder-follower-container) {
  .n-popover {
    background-color: transparent;
  }

  .n-popover:not(.n-popover--raw):not(.n-popover--scrollable):not(
      .n-popover--show-header-or-footer
    ) {
    padding: 0;
  }

  .n-popover-shared {
    margin-top: 10px;
  }
}
</style>
