import { MousePosition } from './utils'
import { ResizerElements } from './types'

export type ResizerDirection = 'horizontal' | 'vertical'

export interface ResizerConfig {
  direction: ResizerDirection
  onResize?: (mousePosition: MousePosition) => void
}

export interface PanelSizes {
  previousSize: string
  nextSize: string
}

export interface ResizerFunction {
  (mousePosition: MousePosition, elements: ResizerElements): PanelSizes | null
  direction: 'horizontal' | 'vertical'
  onResize?: (mousePosition: MousePosition) => void
}

export const resizeElement = (config: ResizerConfig): ResizerFunction => {
  const resizer = (mousePosition: MousePosition, elements: ResizerElements) => {
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

  // Attach config properties directly to the function
  resizer.direction = config.direction
  resizer.onResize = config.onResize

  return resizer as ResizerFunction
}
