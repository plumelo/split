import { component, html } from '@pionjs/pion'
import { resizeElement } from '../src/index'
import '../src/index'

const MultiplePanels = () => {
  const horizontalResizer = resizeElement({
    direction: 'horizontal'
  })

  const verticalResizer = resizeElement({
    direction: 'vertical'
  })

  return html`
    <style>
      .container {
        display: flex;
        height: 400px;
        width: 600px;
        border: 1px solid #ccc;
        margin: 0 20px;
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

      .container-vertical {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .vertical-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        border: 1px solid #ccc;
        overflow: auto;
      }

      .vertical-panel.vertical-top-panel {
        background: linear-gradient(45deg, #ff6b6b, #ffa726);
        color: white;
        padding: 10px 0;
      }

      .vertical-panel.vertical-bottom-panel {
        background: linear-gradient(45deg, #4ecdc4, #45b7d1);
        color: white;
        padding: 10px 0;
      }

      h1 {
        margin: 20px;
        font-family: Arial, sans-serif;
      }
    </style>

    <h1>Pion Split Demo - Multiple Splits</h1>

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

    <div class="container">
      <div class="panel left-panel">
        <div>
          <h3>Left Panel</h3>
        </div>
      </div>

      <pion-split .resizer=${horizontalResizer}></pion-split>

      <div class="panel right-panel">
        <div class="container-vertical">
          <h3>Vertical Panel</h3>

          <div class="vertical-panel vertical-top-panel">
            <div>
              <h3>Top Panel</h3>
            </div>
          </div>

          <pion-split .resizer=${verticalResizer}></pion-split>

          <div class="vertical-panel vertical-top-panel">
            <div>
              <h3>Bottom Panel</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

customElements.define(
  'multiple-panels',
  component(MultiplePanels, { useShadowDOM: true })
)
