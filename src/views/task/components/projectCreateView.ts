import { computed, ref } from 'vue'
import { useListProjectStore } from '@/stores/listProject'
import type { Ref } from 'vue'
import type { FormRules } from 'naive-ui'

interface FormValue {
  projectName: string
}

enum SkinStone {
  NEUTRAL = 'neutral',
  LIGHT = '1f3fc',
  LIGHTER = '1f3fb',
  Medium = '1f3fd',
  MediumDark = '1f3fe',
  Deeper = '1f3ff',
}

interface Emoji {
  i: string
  n: string[]
  r: string // with skin tone
  t: SkinStone // skin tone
  u: string // without skin tone
}

export function useProjectCreateView(
  inputElement: Ref<HTMLInputElement | undefined>
) {
  const listProjectStore = useListProjectStore()
  const isDuplicated = ref<boolean>(false)
  const canSave = computed<boolean>(
    () => formValue.value.projectName.trim() !== '' && !isDuplicated.value
  )
  const popoverVisible = ref<boolean>(false)
  const { formValue, formRules } = useForm()
  const { handleMouseOver, handleMouseLeave, isHover } = useMouse()
  const { cleanInput } = useInput()
  const { emojiValue, getDefaultEmojiConfig, handleSelectEmoji } = useEmoji()

  /**
   * 表单数据和校验规则
   * @returns
   */
  function useForm() {
    const formValue = ref<FormValue>({
      projectName: '',
    })
    const formRules: FormRules = {
      projectName: {
        validator(_, value: string) {
          return new Promise<void>((resolve, reject) => {
            isDuplicated.value = false
            if (!canSave.value) {
              reject(new Error('清单名称不能为空'))
            } else if (listProjectStore.checkProjectIsExist(value)) {
              reject(new Error('Project 名称已存在'))
            } else {
              resolve()
            }
          })
        },
        trigger: ['input', 'blur'],
      },
    }
    return {
      formValue,
      formRules,
    }
  }

  /**
   * 鼠标移动事件
   */
  function useMouse() {
    function handleMouseOver() {
      isHover.value = true
    }
    function handleMouseLeave() {
      return (
        !popoverVisible.value && !emojiValue.value && (isHover.value = false)
      )
    }
    const isHover = ref<boolean>(false)
    return {
      isHover,
      handleMouseOver,
      handleMouseLeave,
    }
  }

  /**
   * input 事件
   */
  function useInput() {
    function cleanInput() {
      formValue.value.projectName = ''
      emojiValue.value = ''
    }
    return {
      cleanInput,
    }
  }

  /**
   * emoji picker 处理 hooks
   */
  function useEmoji() {
    const emojiValue = ref<string>()

    function getDefaultEmojiConfig() {
      const EMOJI_GROUPS_NAMES = {
        smileys_people: '人物',
        animals_nature: '动物 & 自然',
        food_drink: '食物 & 饮品',
        activities: '活动',
        travel_places: '旅行 & 地点',
        objects: '物体',
        symbols: '符号',
        flags: '旗帜',
      }
      const EMOJI_STATIC_TEXTS = { placeholder: '搜索', skinTone: '肤色' }
      return {
        EMOJI_GROUPS_NAMES,
        EMOJI_STATIC_TEXTS,
      }
    }

    function handleSelectEmoji(emoji: Emoji) {
      emojiValue.value = emoji.i
      popoverVisible.value = false
      inputElement.value?.focus()
    }

    return {
      emojiValue,
      getDefaultEmojiConfig,
      handleSelectEmoji,
    }
  }

  return {
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
    handleSelectEmoji,
  }
}
