import { html } from '@pionjs/pion'
import '../demo/basic-demo'
import '../demo/vertical-demo'

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

export const VerticalDemo = () => {
  return html`<vertical-demo></vertical-demo>`
}
VerticalDemo.parameters = {
  docs: {
    description: {
      story: 'Vertical split demo for the pion-split component.'
    }
  }
}
