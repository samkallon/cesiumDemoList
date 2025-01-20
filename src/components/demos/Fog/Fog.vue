<script setup>
import {onMounted, ref} from "vue";
import dat from 'dat.gui'
import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";



let viewer = null
const controls =  {
  '雾浓度': 0.88,
  '雾高度': 73,
}

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


  let PostProcessUtils

  PostProcessUtils = new SamCesiumUtils.PostProcessUtils({viewer,Cesium})
  PostProcessUtils.add('HightFog',{alpha:0.9,height:100})


  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, '雾浓度', 0, 1).onChange(v=>{
    PostProcessUtils.HightFog.uniforms.alpha = controls['雾浓度']
  });
  gui.add(controls, '雾高度', 0, 300).onChange(v=>{
    PostProcessUtils.HightFog.uniforms.height = controls['雾高度']
  });
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
