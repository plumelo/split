export interface MousePosition {
  x: number
  y: number
}

// Extract mouse or touch position from event
export const getMousePosition = (e: MouseEvent | TouchEvent): MousePosition => {
  if (e instanceof MouseEvent) {
    return { x: e.clientX, y: e.clientY }
  } else if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  return {
    x: 0,
    y: 0
  }
}
