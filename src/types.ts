import { ResizerFunction } from './resizers'

export interface PionSplitProps {
  resizer?: ResizerFunction
}

export interface PionSplitElement extends HTMLElement, PionSplitProps {}

export interface ResizerElements {
  previous: HTMLElement
  next: HTMLElement
  container: HTMLElement
}
