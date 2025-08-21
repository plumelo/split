import { css } from '@pionjs/pion'

export const styles = css` <style>
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
        cursor: col-resize;
      }

      :host([data-direction='vertical']) {
        height: 4px;
        width: 100%;
        cursor: row-resize;
      }

      :host(:hover) {
        background: #ccc;
      }

      :host([data-dragging]) {
        background: #007acc;
        cursor: grabbing;
      }
    </style>`
