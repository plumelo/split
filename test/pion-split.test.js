import { expect, fixture, html, waitUntil } from '@open-wc/testing'
import { resizeElement } from '../src/index'
import '../src/index'

describe('pion-split', () => {
  it('should create a pion-split element', async () => {
    const el = await fixture(html`<pion-split></pion-split>`)
    expect(el).to.exist
    expect(el.tagName.toLowerCase()).to.equal('pion-split')
  })

  it('should have default horizontal direction', async () => {
    const el = await fixture(html`<pion-split></pion-split>`)
    await waitUntil(() => el.getAttribute('data-direction'))
    expect(el.getAttribute('data-direction')).to.equal('horizontal')
  })

  it('should set direction from resizer config', async () => {
    const verticalResizer = resizeElement({
      direction: 'vertical'
    })

    const el = await fixture(
      html`<pion-split .resizer=${verticalResizer}></pion-split>`
    )
    await waitUntil(() => el.getAttribute('data-direction'))
    expect(el.getAttribute('data-direction')).to.equal('vertical')
  })

  it('should apply correct CSS for horizontal direction', async () => {
    const horizontalResizer = resizeElement({
      direction: 'horizontal'
    })

    const el = await fixture(
      html`<pion-split .resizer=${horizontalResizer}></pion-split>`
    )
    await waitUntil(() => el.getAttribute('data-direction'))

    const styles = getComputedStyle(el)
    expect(styles.cursor).to.equal('col-resize')
  })

  it('should set dragging state on mousedown', async () => {
    const container = await fixture(html`
      <div style="display: flex; width: 400px; height: 200px;">
        <div style="width: 50%; background: red;"></div>
        <pion-split></pion-split>
        <div style="width: 50%; background: blue;"></div>
      </div>
    `)

    const split = container.querySelector('pion-split')

    // Simulate mousedown
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 100,
      bubbles: true
    })

    split.dispatchEvent(mouseEvent)

    expect(split.getAttribute('data-dragging')).to.equal('true')
  })

  it('should dispatch resize-start event on mousedown', async () => {
    const container = await fixture(html`
      <div style="display: flex; width: 400px; height: 200px;">
        <div style="width: 50%; background: red;"></div>
        <pion-split></pion-split>
        <div style="width: 50%; background: blue;"></div>
      </div>
    `)

    const split = container.querySelector('pion-split')
    let eventFired = false

    split.addEventListener('resize-start', () => {
      eventFired = true
    })

    const mouseEvent = new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 100,
      bubbles: true
    })

    split.dispatchEvent(mouseEvent)

    expect(eventFired).to.be.true
  })

  it('should call onResize callback with correct data', async () => {
    let callbackData = null

    const horizontalResizer = resizeElement({
      direction: 'horizontal',
      onResize: (data) => {
        callbackData = data
      }
    })

    const container = await fixture(html`
      <div style="display: flex; width: 400px; height: 200px;">
        <div style="width: 50%; background: red;"></div>
        <pion-split .resizer=${horizontalResizer}></pion-split>
        <div style="width: 50%; background: blue;"></div>
      </div>
    `)

    const split = container.querySelector('pion-split')

    // Simulate mousedown and mousemove
    const mouseDownEvent = new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 100,
      bubbles: true
    })

    split.dispatchEvent(mouseDownEvent)

    // Simulate mousemove
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 250,
      clientY: 100,
      bubbles: true
    })

    document.dispatchEvent(mouseMoveEvent)

    expect(callbackData).to.not.be.null
    expect(callbackData).to.have.property('previousSize')
    expect(callbackData).to.have.property('nextSize')
    expect(callbackData.previousSize).to.be.a('string')
    expect(callbackData.nextSize).to.be.a('string')
  })

  it('should handle resizer function that returns null gracefully', async () => {
    const failingResizer = () => null
    failingResizer.direction = 'horizontal'

    const container = await fixture(html`
      <div style="display: flex; width: 400px; height: 200px;">
        <div style="width: 50%; background: red;"></div>
        <pion-split .resizer=${failingResizer}></pion-split>
        <div style="width: 50%; background: blue;"></div>
      </div>
    `)

    const split = container.querySelector('pion-split')

    // This should not throw an error
    const mouseDownEvent = new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 100,
      bubbles: true
    })

    expect(() => split.dispatchEvent(mouseDownEvent)).to.not.throw()
  })

  it('should clean up event listeners on mouseup', async () => {
    const container = await fixture(html`
      <div style="display: flex; width: 400px; height: 200px;">
        <div style="width: 50%; background: red;"></div>
        <pion-split></pion-split>
        <div style="width: 50%; background: blue;"></div>
      </div>
    `)

    const split = container.querySelector('pion-split')

    // Simulate mousedown
    const mouseDownEvent = new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 100,
      bubbles: true
    })

    split.dispatchEvent(mouseDownEvent)
    expect(split.getAttribute('data-dragging')).to.equal('true')

    // Simulate mouseup
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true
    })

    document.dispatchEvent(mouseUpEvent)

    expect(split.hasAttribute('data-dragging')).to.be.false
  })

  it('should handle missing adjacent elements gracefully', async () => {
    const split = await fixture(html`<pion-split></pion-split>`)

    // This should not throw an error when there are no adjacent elements
    const mouseDownEvent = new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 100,
      bubbles: true
    })

    expect(() => split.dispatchEvent(mouseDownEvent)).to.not.throw()
  })
})
