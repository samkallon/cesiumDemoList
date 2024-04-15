<script setup>
import {onMounted, ref} from "vue";
import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";

let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer', initCamera:false})
  viewer = samCzm.viewer
  viewer.scene.camera.flyToBoundingSphere(
      new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(center[0],center[1]), 3000),
      {
        offset: new Cesium.HeadingPitchRoll(0, Cesium.Math.toRadians(-30), 0),
        duration: 1
      }
  )
  // 随机竖直飞线
  samCzm.lineFlowInit(center, 200);
})

const curr = ref(1)
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