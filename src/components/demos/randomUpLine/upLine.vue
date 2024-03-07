<script setup>
import {onMounted, ref} from "vue";
import {
  initViewer,
} from "@/utils/cesiumUtils.js";
import {lineFlowInit} from "../../../utils/cesiumUtils.js";
import * as Cesium from "cesium";
import {HeadingPitchRoll, Math as CzmMath} from "cesium";

let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  viewer = initViewer('cesiumContainer')
  viewer.scene.camera.flyToBoundingSphere(
      new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(center[0],center[1]), 3000),
      {
        offset: new HeadingPitchRoll(0, CzmMath.toRadians(-30), 0),
        duration: 1
      }
  )
  // 随机竖直飞线
  lineFlowInit(viewer, center, 200);
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