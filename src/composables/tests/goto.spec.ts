import { describe, expect, it } from 'vitest'
import { useSetup } from '@/tests/helper/component'
import { RouteName } from '@/router/constants'
import { useGoto } from '../goto'

describe('useGoto', () => {
  it('should go to Home', () => {
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })

    expect(router.push).toBeCalledWith({ name: RouteName.HOME })
  })

  it('should go to Settings', () => {
    const { router } = useSetup(() => {
      const { gotoSetting } = useGoto()
      gotoSetting()
    })

    expect(router.push).toBeCalledWith({ name: RouteName.SETTINGS })
  })
})
