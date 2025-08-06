import { component, html, useState, useEffect } from '@pionjs/pion'
import { getMousePosition, MousePosition } from './utils'
import { ResizerFunction } from './resizers'

export interface PionSplitElement extends HTMLElement, PionSplitProps {}

export interface PionSplitProps {
  resizer?: ResizerFunction
  onResize?: (mousePosition: MousePosition, percentage: number) => void
}

const PionSplit = (host: PionSplitElement) => {
  const [, setIsDragging] = useState(false)

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

    const result = host.resizer(mousePosition, elements)

    if (result) {
      host.onResize?.(mousePosition, result.percentage)

      host.dispatchEvent(
        new CustomEvent('resize', {
          detail: {
            mousePosition,
            percentage: result.percentage,
            previousSize: result.previousSize,
            nextSize: result.nextSize
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

  useEffect(() => {
    host.addEventListener('mousedown', handleMouseDown)
    host.addEventListener('touchstart', handleMouseDown)

    return () => {
      host.removeEventListener('mousedown', handleMouseDown)
      host.removeEventListener('touchstart', handleMouseDown)
    }
  }, [])

  return html`
    <style>
      :host {
        display: block;
        width: 4px;
        background: #e0e0e0;
        cursor: col-resize;
        user-select: none;
        position: relative;
        z-index: 1;
        min-height: 100%;
      }

      /* :host([data-direction='vertical']) {
        height: 4px;
        width: 100%;
        cursor: row-resize;
        min-height: auto;
        min-width: 100%;
      } */

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
