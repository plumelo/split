import { ResizerFunction } from './resizers'

export interface PionSplitElement extends HTMLElement, PionSplitProps {}

export interface PionSplitProps {
  resizer?: ResizerFunction
  direction?: 'horizontal' | 'vertical'
  onResize?: (data: { previousSize: string; nextSize: string; percentage: number }) => void
}

export interface ResizerElements {
  previous: HTMLElement
  next: HTMLElement
  container: HTMLElement
}
