import { expect, fixture, html } from '@open-wc/testing'
import '../src/index'

describe('pion-split', () => {
  it('should create a pion-split element', async () => {
    const el = await fixture(html`<pion-split></pion-split>`)
    expect(el).to.exist
    expect(el.tagName.toLowerCase()).to.equal('pion-split')
  })
})
