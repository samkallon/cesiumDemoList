<script setup>
import {onMounted} from "vue";
import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";

let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer', initCamera:true})
  viewer = samCzm.viewer
  samCzm.lightenEillposid(
      {
        viewer,
        position:Cesium.Cartesian3.fromDegrees(...center),
        radii:new Cesium.Cartesian3(2000,2000,2000),
        color: Cesium.Color.fromCssColorString('#fffc00'),
        speed:10.0
      }
  )
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