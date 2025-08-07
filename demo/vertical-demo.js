import { component, html } from '@pionjs/pion'
import { resizeElement } from '../src/index'
import '../src/index'

const VerticalDemo = () => {
  const verticalResizer = resizeElement({
    direction: 'vertical'
  })

  return html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        height: 600px;
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
        width: 100%;
        height: 100%;
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
