import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import * as misc from '@/composables/misc'
import { fireEvent, useSetup } from '@/test/helper'
import { useCommandModal } from '../commandModal'

describe('command modal', () => {
  beforeEach(() => {
    const { closeCommandModal } = useCommandModal()
    closeCommandModal()
  })

  it('should open command modal', () => {
    const { openCommandModal, commandModalVisible } = useCommandModal()
    openCommandModal()

    expect(commandModalVisible.value).toBe(true)
  })

  it('should close command modal', () => {
    const { openCommandModal, commandModalVisible, closeCommandModal } =
      useCommandModal()
    openCommandModal()
    closeCommandModal()

    expect(commandModalVisible.value).toBe(false)
  })

  it('should open command modal when press cmd+k on Mac', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => true))
    const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keydown({
      key: 'k',
      metaKey: true,
    })

    expect(commandModalVisible.value).toBe(true)

    wrapper.unmount()
  })

  it('should open command modal when press ctrl+k on Windows', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => false))
    const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keydown({
      key: 'k',
      ctrlKey: true,
    })

    expect(commandModalVisible.value).toBe(true)

    wrapper.unmount()
  })
})
