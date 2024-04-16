<script setup>
import {onMounted, ref} from "vue";
import Draw from '@/utils/Draw.js'
import * as Cesium from "cesium"
import SamCesiumUtils from "sam-czm-utils";
import dat from "dat.gui";
let viewer,DrawObj,tileset,samCzm = null
onMounted(async()=>{
  samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2539811),
  );
  viewer.camera.flyTo({
    destination:{
      "x": -2196414.0305486363,
      "y": 5180162.321807583,
      "z": 2994845.400507529
    },
    orientation:new Cesium.HeadingPitchRoll(0.005264386980204705,-0.39973636811014357,0.00002282976960188421)
  })
  tileset.customShader = samCzm.getTilesetDynamicShader()
})



</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>

</template>

<style scoped lang="scss">
.container{
  width: 100%;
  position: relative;
}
.dig-terrian-container{
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
}
#cesiumContainer{
  width: 100%;
  height: 90vh;
}
</style>