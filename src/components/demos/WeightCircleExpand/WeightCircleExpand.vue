<script setup>
import {onMounted} from "vue";
import {addWeightCircleExpand} from "../../../utils/cesiumUtils.js";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer', initCamera:true})
  viewer = samCzm.viewer
  samCzm.addWeightCircleExpand(
      {
        latlng:center,
        radius:3000,
        color: '#ffe100',
        speed:3.0,
        height:10
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