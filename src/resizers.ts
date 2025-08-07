import { MousePosition } from './utils'
import { ResizerElements } from './types'

export interface ResizerConfig {
  direction: 'horizontal' | 'vertical'
  onResize?: (mousePosition: MousePosition) => void
}

export interface PanelSizes {
  previousSize: string
  nextSize: string
}

export type ResizerFunction = (
  mousePosition: MousePosition,
  elements: ResizerElements
) => PanelSizes | null

export const resizeElement = (config: ResizerConfig): ResizerFunction => {
  return (mousePosition: MousePosition, elements) => {
    const { previous, next, container } = elements
    const { direction, onResize } = config

    const containerRect = container.getBoundingClientRect()

    let percentage: number

    if (direction === 'horizontal') {
      percentage =
        ((mousePosition.x - containerRect.left) / containerRect.width) * 100
    } else {
      percentage =
        ((mousePosition.y - containerRect.top) / containerRect.height) * 100
    }

    // Clamp percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage))

    const previousSize = `${percentage}%`
    const nextSize = `${100 - percentage}%`

    if (direction === 'horizontal') {
      previous.style.width = previousSize
      next.style.width = nextSize
    } else {
      previous.style.height = previousSize
      next.style.height = nextSize
    }

    // Call the onResize callback
    onResize?.(mousePosition)

    return {
      percentage,
      previousSize: `${percentage}%`,
      nextSize: `${100 - percentage}%`
    }
  }
}
