<template>
  <div ref="mapRef" class="map" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Cartesian3, CesiumTerrainProvider, GeographicTilingScheme, ImageryLayer, ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer, WebMapTileServiceImageryProvider } from 'cesium'
import { PopupVue } from '../../../packages/PopupVue'

import Test from './test2.vue'

let viewer
const mapRef = ref(null)
let popup, popup2
function tdtLayer() {
  const layer = 'img'
  const tileMatrixSet = 'c'
  const name = `${layer}_${tileMatrixSet}`
  const tk = '4267820f43926eaf808d61dc07269beb'

  const tdtImgCUrl = `http://{s}.tianditu.gov.cn/${name}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${layer}&tileMatrixSet=${tileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${tk}`
  return new WebMapTileServiceImageryProvider({
    url: tdtImgCUrl,
    layer,
    style: 'default',
    format: 'tiles',
    tileMatrixSetID: tileMatrixSet,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tilingScheme: new GeographicTilingScheme(),
    tileMatrixLabels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
    ],
    maximumLevel: 50,
  })
}

onMounted(async () => {
  if (mapRef.value) {
    viewer = new Viewer(mapRef.value, {
      baseLayer: ImageryLayer.fromProviderAsync(tdtLayer()),
      terrainProvider: await CesiumTerrainProvider.fromUrl(
        'http://data.mars3d.cn/terrain',
      ),
      infoBox: false,
      selectionIndicator: false,
      animation: false,
      timeline: false,
      baseLayerPicker: false,
    })

    const { longitude, latitude, height } = {
      height: 66.31026938893555, latitude: 28.143662686652874, longitude: 113.62423548410626,
    }

    const position = Cartesian3.fromDegrees(longitude, latitude, height)

    const position2 = Cartesian3.fromDegrees(113.6272273497165, 28.143980467030072, 71.92652572119125)

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(longitude, latitude, 1000),
    })

    const { scene } = viewer
    const eventHandler = new ScreenSpaceEventHandler(scene.canvas)
    eventHandler.setInputAction(
      (movement) => {
        // const lnglat = new Coord(viewer).cartesian2ToLnglat(movement.position)
      },
      ScreenSpaceEventType.MIDDLE_CLICK,
    )

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

    const options2 = {
      component: Test,
      position: position2,
      props: {
        id: 2,
        close: () => {
          popup2.remove()
        },
      },

    }
    popup2 = new PopupVue(viewer, options2)
  }
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
