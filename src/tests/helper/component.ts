import { mount } from '@vue/test-utils'
import type { RouterMock } from 'vue-router-mock'
import type { VueWrapper } from '@vue/test-utils'

/**
 * @description 用于测试 router 时, 返回对应的 wrapper 和 router
 * @param setup
 */
export function useSetup(setup: () => void): {
  wrapper: VueWrapper
  router: RouterMock
} {
  const Comp = {
    setup,
    render() {},
  }

  const wrapper = mount(Comp)

  return {
    wrapper,
    router: wrapper.router,
  }
}
