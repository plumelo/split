import { component, html, useState } from '@pionjs/pion'
import { resizeElement } from '../src/index'

const VerticalDemo = () => {
  const [topPanelSize, setTopPanelSize] = useState()
  const [bottomPanelSize, setBottomPanelSize] = useState()

  const onResize = ({ previousSize, nextSize }) => {
    setTopPanelSize(previousSize)
    setBottomPanelSize(nextSize)
  }

  const verticalResizer = resizeElement({
    direction: 'vertical',
    onResize
  })

  return html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 600px;
        border: 1px solid #ccc;
      }

      .panel {
        background: #f5f5f5;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        width: 100%;
        height: 100%;
      }

      .stats {
        margin: 20px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 4px;
        font-family: monospace;
      }

      .top-panel {
        background: linear-gradient(45deg, #ff6b6b, #ffa726);
        color: white;
      }

      .bottom-panel {
        background: linear-gradient(45deg, #4ecdc4, #45b7d1);
        color: white;
      }

      h1 {
        margin: 20px;
        font-family: Arial, sans-serif;
      }
    </style>

    <h1>Pion Split Demo - Vertical Split</h1>

    <div class="stats">
      <p>Top Panel Size: ${topPanelSize || '50%'}</p>
      <p>Bottom Panel Size: ${bottomPanelSize || '50%'}</p>
    </div>

    <div class="container">
      <div class="panel top-panel">
        <div>
          <h3>Top Panel</h3>
        </div>
      </div>

      <pion-split .resizer=${verticalResizer}></pion-split>

      <div class="panel bottom-panel">
        <div>
          <h3>Bottom Panel</h3>
        </div>
      </div>
    </div>
  `
}

customElements.define(
  'vertical-demo',
  component(VerticalDemo, { useShadowDOM: true })
)
