import { component, html, useState, useEffect } from '@pionjs/pion'
import { getMousePosition, MousePosition } from './utils'
import { PionSplitElement } from './types'
import { ResizerDirection } from './resizers'

const PionSplit = (host: PionSplitElement) => {
  const [, setIsDragging] = useState(false)

  const getDirection = (): ResizerDirection => {
    if (host.resizer && 'direction' in host.resizer) {
      return host.resizer.direction
    }

    return 'horizontal'
  }

  useEffect(() => {
    const direction = getDirection()
    host.setAttribute('data-direction', direction)
  }, [host.resizer])

  useEffect(() => {
    host.addEventListener('mousedown', handleMouseDown)
    // host.addEventListener('touchstart', handleMouseDown)

    return () => {
      host.removeEventListener('mousedown', handleMouseDown)
      // host.removeEventListener('touchstart', handleMouseDown)
    }
  }, [])

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

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    const mousePosition = getMousePosition(e)

    setIsDragging(true)
    host.setAttribute('data-dragging', 'true')

    host.dispatchEvent(
      new CustomEvent('resize-start', {
        detail: { mousePosition },
        bubbles: true
      })
    )

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const mousePosition = getMousePosition(e)
      handleResize(mousePosition)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      host.removeAttribute('data-dragging')

      host.dispatchEvent(
        new CustomEvent('resize-end', {
          detail: {},
          bubbles: true
        })
      )

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseUp)
  }

  return html`
    <style>
      :host {
        display: block;
        background: #e0e0e0;
        user-select: none;
        position: relative;
        z-index: 1;
      }

      :host([data-direction='horizontal']) {
        min-height: 100%;
        width: 4px;
        height: 4px;
        cursor: col-resize;
      }

      :host([data-direction='vertical']) {
        height: 4px;
        width: 100%;
        cursor: row-resize;
        min-height: auto;
        min-width: 100%;
      }

      :host(:hover) {
        background: #ccc;
      }

      :host([data-dragging]) {
        background: #007acc;
      }
    </style>
  `
}

customElements.define('pion-split', component(PionSplit))
