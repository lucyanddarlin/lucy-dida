import { SmartProjectName } from '@/types'

export enum SmartProjectOptionValue {
  VisiBle = 'visible',
  Hidden = 'hidden'
}

interface VisibleOption {
  label: '显示'
  value: SmartProjectOptionValue
}

interface HiddenOption {
  label: '隐藏'
  value: SmartProjectOptionValue
}

type Options = [VisibleOption, HiddenOption]

export interface SettingSmartProject {
  title: SmartProjectName
  options: Options
  option: string
  icon: string
}

function createOptions(): Options {
  const visibleOption: VisibleOption = {
    label: '显示',
    value: SmartProjectOptionValue.VisiBle
  }
  const hiddenOption: HiddenOption = {
    label: '隐藏',
    value: SmartProjectOptionValue.Hidden
  }

  return [visibleOption, hiddenOption]
}

const completeSmartProject: SettingSmartProject = {
  title: SmartProjectName.Complete,
  options: createOptions(),
  option: 'visible',
  icon: 'material-symbols:check-box'
}

const hiddenSmartProject: SettingSmartProject = {
  title: SmartProjectName.Trash,
  options: createOptions(),
  option: 'visible',
  icon: 'mdi:delete-variant'
}

export function hideSmartProject(project: SettingSmartProject) {
  project.option = SmartProjectOptionValue.Hidden
}

export const smartProjects = [completeSmartProject, hiddenSmartProject]
