import { Coord } from './Coord'

export class Popup {
  viewer
  element
  options
  cameraMoveEnd
  moving = false
  postRender
  coord
  constructor(viewer, options) {
    this.viewer = viewer
    this.coord = new Coord(viewer)
    this.options = options
    this.element = this.options?.element
    this.addCameraLisener()
    this.addMapListener()
  }

  setPosition(position) {
    if (this.viewer && position) {
      const screenPosition = this.coord.cartesian3ToCartesian2(position)
      const { element } = this
      if (element && screenPosition) {
        let x = screenPosition.x - element.clientWidth / 2
        let y = screenPosition.y - element.clientHeight - 15
        if (this.options?.popPosition) {
          if (this.options?.popPosition === 'leftbottom') {
            x = screenPosition.x
            y = screenPosition.y - element.clientHeight
          }
          else if (this.options?.popPosition === 'leftmiddle') {
            x = screenPosition.x + 20
            y = screenPosition.y - element.clientHeight / 2
          }
        }

        element.style.display = 'block'
        element.style.left = `${x}px`
        element.style.top = `${y}px`
      }

      if (this.options)
        this.options.position = position
    }
  }

  addCameraLisener() {
    if (this.options?.visibleMaxCameraHeight) {
      this.cameraMoveEnd = this.viewer?.camera.moveEnd.addEventListener(() => {
        const h = this.viewer?.camera.getMagnitude()
        const min = 6375000
        if (h && this.options?.visibleMaxCameraHeight && this.element) {
          if (h - min > this.options.visibleMaxCameraHeight)
            this.hide()
          else this.show()
        }
      })
    }
  }

  hide() {
    if (this.element)
      this.element.style.visibility = 'hidden'
  }

  show() {
    if (this.element)
      this.element.style.visibility = 'visible'
  }

  destory() {
    if (this.cameraMoveEnd)
      this.cameraMoveEnd()
    if (this.postRender)
      this.postRender()
  }

  addMapListener() {
    this.postRender = this.viewer?.scene.postRender.addEventListener(() => {
      const position = this.options?.position
      if (position) {
        if (this.options?.renderInViewBounds) {
          if (this.coord.isVisibleByBounds(position)) {
            if (!this.moving)
              this.setPosition(position)
            if (this.element?.style.visibility !== 'hidden')
              this.show()
          }
          else {
            this.hide()
          }
        }
        else {
          if (!this.moving)
            this.setPosition(position)
        }
      }
    })
  }
}
