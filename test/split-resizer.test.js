import { expect, fixture, html } from '@open-wc/testing'
import '../src/index'
import { resizeSplitPanels, getAdjacentElements } from '../src/index'

describe('split-resizer', () => {
  it('should create a split-resizer element', async () => {
    const el = await fixture(html`<split-resizer></split-resizer>`)
    expect(el).to.exist
    expect(el.tagName).to.equal('SPLIT-RESIZER')
  })
})
