<script setup>
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer = null
onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer', initCamera:false})
  viewer = samCzm.viewer
  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset,{duration:1})

  let PostProcessUtils

  PostProcessUtils = new SamCesiumUtils.PostProcessUtils({viewer,Cesium})
  PostProcessUtils.add('RainFly')
  PostProcessUtils.add('RainReflect')
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
