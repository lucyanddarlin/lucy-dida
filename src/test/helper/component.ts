import { mount } from '@vue/test-utils'
export function useSetup<T>(setup: () => T) {
  const comp = {
    setup,
    render() {},
  }

  const wrapper = mount(comp)
  return {
    wrapper,
    // router: wrapper.router
  }
}
