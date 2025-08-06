import { html } from '@pionjs/pion'
import '../demo/basic-demo'

export default {
  title: 'Components/PionSplit',
  tags: ['autodocs']
}

export const BasicDemo = () => {
  return html`<basic-demo></basic-demo>`
}

BasicDemo.parameters = {
  docs: {
    description: {
      story: 'Basic demo for the pion-split component.'
    }
  }
}
