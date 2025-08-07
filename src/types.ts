import { ResizerFunction } from './resizers'
import { MousePosition } from './utils'

export interface PionSplitElement extends HTMLElement, PionSplitProps {}

export interface PionSplitProps {
  resizer?: ResizerFunction
  onResize?: (mousePosition: MousePosition) => void
}

export interface ResizerElements {
  previous: HTMLElement
  next: HTMLElement
  container: HTMLElement
}
