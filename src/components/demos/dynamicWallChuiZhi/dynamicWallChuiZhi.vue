<script setup>
import {onMounted, ref} from "vue";
import {addWallGeojson, getBoundingSphereFromCartesian3List, initViewer} from "@/utils/cesiumUtils.js";
import {Cesium3DTileset,HeadingPitchRoll,Math as CzmMath} from "cesium";

let viewer = null
onMounted(async () => {
  viewer = initViewer('cesiumContainer')
  viewer.scene.primitives.add(
      await Cesium3DTileset.fromIonAssetId(354759),
  );
  const wallList = [[
    {
      "x": 1532691.0113004209,
      "y": -4465197.970253931,
      "z": 4274384.632662207
    },
    {
      "x": 1532746.191771099,
      "y": -4465198.01788432,
      "z": 4274364.919617005
    },
    {
      "x": 1532786.9859714806,
      "y": -4465066.866502248,
      "z": 4274486.459959381
    },
    {
      "x": 1532733.9624392178,
      "y": -4465065.997455441,
      "z": 4274506.267881826
    }
  ]]
  addWallGeojson({
    wallList,
    maximumHeights: 30,
    minimumHeights: 0,
    viewer
  })
  viewer.scene.camera.flyToBoundingSphere(getBoundingSphereFromCartesian3List(wallList[0]),{
    offset: new HeadingPitchRoll(0,CzmMath.toRadians(-30),0),
    duration:1
  })
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

#cesiumContainer {
  width: 100%;
  height: 90vh;
}
</style>