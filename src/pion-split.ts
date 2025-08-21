import { component, html, useEffect } from '@pionjs/pion'
import { getMousePosition, MousePosition } from './utils'
import { PionSplitElement } from './types'
import { ResizerDirection } from './resizers'
import { styles } from './pion-split.css'

const PionSplit = (host: PionSplitElement) => {
  let hasTouch = false

  const getDirection = (): ResizerDirection => {
    if (host.resizer && 'direction' in host.resizer) {
      return host.resizer.direction
    }

    return 'horizontal'
  }

  const getElements = () => {
    const parent = host.parentElement
    if (!parent) return null

    const children = Array.from(parent.children)
    const index = children.indexOf(host)

    const previous = children[index - 1] as HTMLElement
    const next = children[index + 1] as HTMLElement

    if (!previous || !next) return null

    return {
      previous,
      next,
      container: parent
    }
  }

  const handleResize = (mousePosition: MousePosition) => {
    const elements = getElements()
    if (!elements || !host.resizer) return

    const panelSizes = host.resizer(mousePosition, elements)

    if (panelSizes) {
      host.dispatchEvent(
        new CustomEvent('resize', {
          detail: {
            mousePosition,
            previousSize: panelSizes.previousSize,
            nextSize: panelSizes.nextSize
          },
          bubbles: true
        })
      )
    }
  }

  const handlePointerDown = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    const mousePosition = getMousePosition(e)

    host.setAttribute('data-dragging', 'true')

    host.dispatchEvent(
      new CustomEvent('resize-start', {
        detail: { mousePosition },
        bubbles: true
      })
    )

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const mousePosition = getMousePosition(e)
      handleResize(mousePosition)
    }

    const handlePointerUp = () => {
      host.removeAttribute('data-dragging')

      host.dispatchEvent(
        new CustomEvent('resize-end', {
          detail: {},
          bubbles: true
        })
      )

      document.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('mouseup', handlePointerUp)
      document.removeEventListener('touchmove', handlePointerMove)
      document.removeEventListener('touchend', handlePointerUp)
    }

    document.addEventListener('mousemove', handlePointerMove)
    document.addEventListener('mouseup', handlePointerUp)
    document.addEventListener('touchmove', handlePointerMove)
    document.addEventListener('touchend', handlePointerUp)
  }

  const handleTouchStart = (e: TouchEvent) => {
    hasTouch = true
    handlePointerDown(e)
  }

  const handleMouseDown = (e: MouseEvent) => {
    if (hasTouch) return
    handlePointerDown(e)
  }

  useEffect(() => {
    const direction = getDirection()
    host.setAttribute('data-direction', direction)
  }, [host.resizer])

  useEffect(() => {
    host.addEventListener('mousedown', handleMouseDown)
    host.addEventListener('touchstart', handleTouchStart)

    return () => {
      host.removeEventListener('mousedown', handleMouseDown)
      host.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return html``
}

customElements.define(
  'pion-split',
  component(PionSplit, {
    styleSheets: [styles]
  })
)

export { PionSplit }
