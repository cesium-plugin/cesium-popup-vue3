import { h, render } from 'vue'
import { Popup } from './Popup'

export class PopupVue {
  viewer
  element
  popup
  constructor(viewer, options) {
    this.viewer = viewer
    this.init(options)
  }

  init(options) {
    const { component, position, popupCommonOption, props } = options
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.className = 'popup'

    this.element = div
    if (component)
      render(h(component, props), div)
    this.viewer.container.appendChild(div)

    this.popup = new Popup(this.viewer, {
      ...popupCommonOption,
      element: div,
      position,
    })
  }

  remove() {
    if (this.element)
      this.viewer.container.removeChild(this.element)
    this.popup?.destory()
    this.element = null
  }
}
