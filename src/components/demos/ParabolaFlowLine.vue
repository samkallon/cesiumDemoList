<script setup>
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  let viewer = null
  let center = [113.9236839, 22.528061]
  const samCzm = new SamCesiumUtils.samCzm({Cesium: Cesium})
  samCzm.initViewer({id: 'cesiumContainer', initCamera: true})
  viewer = samCzm.viewer
  viewer.scene.camera.flyToBoundingSphere(
      new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(center[0], center[1]), 3000),
      {
        offset: new Cesium.HeadingPitchRoll(0, Cesium.Math.toRadians(-30), 0),
        duration: 1
      }
  )
  let positions = [
    [113.8236839, 22.528061],
    [114.0236839, 22.528061],
    [113.9236839, 22.428061],
    [113.9236839, 22.628061],
    [113.8236839, 22.428061],
    [114.0236839, 22.628061],
    [113.8236839, 22.628061],
    [114.0236839, 22.428061]
  ]

  // 随机竖直飞线
  samCzm.parabolaFlowLine({center, positions, height: 5000,flowNumInEachLine:3});
})

</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>

</template>

<style scoped lang="scss">
.container {
  width: 100%;
  position: relative;
}

.dig-terrian-container {
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
}

#cesiumContainer {
  width: 100%;
  height: 90vh;
}
</style>