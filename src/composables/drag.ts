import { useEventListener } from '@vueuse/core'

type MoveRange = [number, number]

interface DragOptions {
  el: HTMLDivElement
  moveRange: MoveRange
  onMove: (moveDistance: number) => void
}

/**
 * 拖拽 hooks
 * @param option
 */
export function useDrag(option: DragOptions) {
  const { el, moveRange, onMove } = option
  useEventListener(el, 'mousedown', (e: MouseEvent) => {
    e.preventDefault()

    let startDragX = e.clientX
    let moveDistance = 0

    const removeMouseMove = useEventListener(
      document,
      'mousemove',
      (e: MouseEvent) => {
        moveDistance = e.clientX - startDragX

        if (moveRange) {
          const nextPoint = e.clientX + moveDistance

          if (nextPoint <= moveRange[0]) return
          if (nextPoint >= moveRange[1]) return

          onMove(moveDistance)
          startDragX = e.clientX
        }
      }
    )
    const removeMouseUp = useEventListener(document, 'mouseup', () => {
      removeMouseUp()
      removeMouseMove()
    })
  })
}
