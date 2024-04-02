type CustomNode = HTMLElement | Document

interface FireEvent {
  keydown: (options: KeyboardEventInit) => void
}

export const fireEvent: FireEvent = {
  keydown(options: KeyboardEventInit) {
    const event = new KeyboardEvent('keydown', options)
    window.dispatchEvent(event)
  },
}
