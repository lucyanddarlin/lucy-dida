import { computed, ref } from 'vue'
import { useListProjectStore } from '@/stores/listProject'
import type { Ref } from 'vue'
import type { FormRules } from 'naive-ui'

interface FormValue {
  projectName: string
}

export function useProjectCreateView(
  inputElement: Ref<HTMLInputElement | undefined>
) {
  const listProjectStore = useListProjectStore()
  const isDuplicated = ref<boolean>(false)
  const canSave = computed<boolean>(
    () => formValue.value.projectName.trim() !== '' && !isDuplicated.value
  )
  const { formValue, formRules } = useForm()
  const { handleMouseOver, handleMouseLeave, isHover } = useMouse()
  const popoverVisible = ref<boolean>(false)

  /**
   * 表单数据和校验规则
   * @returns
   */
  function useForm() {
    const formValue = ref<FormValue>({
      projectName: ''
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
        trigger: ['input', 'blur']
      }
    }
    return {
      formValue,
      formRules
    }
  }

  /**
   *
   */
  function useMouse() {
    function handleMouseOver() {
      isHover.value = true
    }
    function handleMouseLeave() {
      return !popoverVisible.value && (isHover.value = false)
    }
    const isHover = ref<boolean>(false)
    return {
      isHover,
      handleMouseOver,
      handleMouseLeave
    }
  }

  return {
    canSave,
    formValue,
    formRules,
    popoverVisible,
    handleMouseOver,
    handleMouseLeave,
    isHover
  }
}
