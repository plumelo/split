import { component, html, useState } from '@pionjs/pion'
import { resizeElement } from '../src/index'
import '../src/index'

const BasicDemo = () => {
  const [leftPanelSize, setLeftPanelSize] = useState()
  const [rightPanelSize, setRightPanelSize] = useState()

  const onResize = ({ previousSize, nextSize }) => {
    setLeftPanelSize(previousSize)
    setRightPanelSize(nextSize)
  }

  const horizontalResizer = resizeElement({
    direction: 'horizontal',
    onResize
  })

  return html`
    <style>
      .container {
        display: flex;
        height: 400px;
        width: 600px;
        border: 1px solid #ccc;
        margin: 20px;
      }

      .panel {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 20px;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        width: 50%;
      }

      .left-panel {
        background: linear-gradient(45deg, #ff6b6b, #ffa726);
        color: white;
      }

      .right-panel {
        background: linear-gradient(45deg, #4ecdc4, #45b7d1);
        color: white;
      }

      .stats {
        margin: 20px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 4px;
        font-family: monospace;
      }

      h1 {
        margin: 20px;
        font-family: Arial, sans-serif;
      }
    </style>

    <h1>Pion Split Demo - Horizontal Split</h1>

    <div class="stats">
      <p>Left Panel Size: ${leftPanelSize || '50%'}</p>
      <p>Right Panel Size: ${rightPanelSize || '50%'}</p>
    </div>

    <div class="container">
      <div class="panel left-panel">
        <div>
          <h3>Left Panel</h3>
        </div>
      </div>

      <pion-split .resizer=${horizontalResizer}></pion-split>

      <div class="panel right-panel">
        <div>
          <h3>Right Panel</h3>
        </div>
      </div>
    </div>
  `
}

customElements.define(
  'basic-demo',
  component(BasicDemo, { useShadowDOM: true })
)
