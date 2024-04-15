<script setup>
import * as Cesium from 'cesium'
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
let viewer = null
onMounted(async()=>{
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
// try!
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.primitives.add(new samCzm.CustomPrimitive.DimondPrimitive({Cesium}))
  viewer.camera.setView({
    destination:{
      "x": -2605877.6351897535,
      "y": 4741170.8930678805,
      "z": 3367173.3836399023
    },
    orientation:{
      heading:6.03062824032168,
      pitch:-0.3269054991435494,
      roll:6.283184968930444
    }
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