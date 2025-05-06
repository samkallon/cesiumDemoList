<script setup>
import {onMounted, ref} from "vue";
import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";
import {getAssetsFile} from "@/utils/utils.js";



let viewer = null


onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset, {
    duration: 0,
  })

  let positions = [
    {
      "latitude": 42.37206041690349,
      "longitude": -71.08035649839435,
    },
    {
      "latitude": 42.37142968902346,
      "longitude": -71.04800190669161,
    },
    {
      "latitude": 42.349202756140386,
      "longitude": -71.04595812050403,
    },
    {
      "latitude": 42.35050276522226,
      "longitude": -71.07621270035652
    },
    {
      "latitude": 42.37206041690349,
      "longitude": -71.08035649839435,
    },
  ]
  // 添加反射水面
  // const reflectWaterPrimitive = new ReflectWaterPrimitive({
  const reflectWaterPrimitive = new SamCesiumUtils.CustomPrimitive.ReflectWaterPrimitive({
    Cesium,
    scene:viewer.scene,
    height: 2,
    positions:positions.map(e=>{
      e.latitude = Cesium.Math.toRadians(e.latitude)
      e.longitude = Cesium.Math.toRadians(e.longitude)
      return e
    }),
    normalMapUrl:getAssetsFile('imgs/materialImg/waterNormals.jpg'),
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
  height: 100%;
  position: relative;
}


</style>
