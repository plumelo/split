import { MousePosition } from './utils'

export interface ResizerConfig {
  direction: 'horizontal' | 'vertical'
  onResize?: (mousePosition: MousePosition, percentage: number) => void
  customResize?: (
    previous: HTMLElement,
    next: HTMLElement,
    percentage: number
  ) => void
}

export interface ResizerFunction {
  (
    mousePosition: MousePosition,
    elements: {
      previous: HTMLElement
      next: HTMLElement
      container: HTMLElement
    }
  ): {
    percentage: number
    previousSize: string
    nextSize: string
  } | null
}

export const resizeElement = (config: ResizerConfig): ResizerFunction => {
  return (mousePosition: MousePosition, elements) => {
    const { previous, next, container } = elements
    const { direction, onResize, customResize } = config

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

    if (customResize) {
      // Use custom resize logic
      customResize(previous, next, percentage)
    } else {
      // Default resize logic
      const previousSize = `${percentage}%`
      const nextSize = `${100 - percentage}%`

      if (direction === 'horizontal') {
        previous.style.width = previousSize
        next.style.width = nextSize
      } else {
        previous.style.height = previousSize
        next.style.height = nextSize
      }
    }

    // Call the onResize callback
    onResize?.(mousePosition, percentage)

    return {
      percentage,
      previousSize: `${percentage}%`,
      nextSize: `${100 - percentage}%`
    }
  }
}

export const resizers = {
  horizontal: (onResize?: ResizerConfig['onResize']) =>
    resizeElement({
      direction: 'horizontal',
      onResize
    }),

  vertical: (onResize?: ResizerConfig['onResize']) =>
    resizeElement({
      direction: 'vertical',
      onResize
    }),

  custom: (config: ResizerConfig) => resizeElement(config)
}
