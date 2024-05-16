```javascript
import { PopupVue } from 'cesium-popup-vue3/packages/PopupVue'
import Test from './test2.vue'
const height= 66.31026938893555 
const latitude= 28.143662686652874
const longitude= 113.62423548410626
const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
let popup
const options = {
      component: Test,
      position,
      props: {
        id: 1,
        close: () => {
          popup.remove()
        },
      },
    }
popup = new PopupVue(viewer, options)
````