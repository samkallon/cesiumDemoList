<script setup>
import {onMounted} from "vue";
import dat from 'dat.gui'
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";



let viewer = null
const controls =  {
  '雪覆盖': 0.8,
  '雪速度': 90,
  '雪花大小': 0.02
}

onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset,{duration:1})


  const snowCoverPostProcess = new Cesium.PostProcessStage(
      samCzm.getSnowCoverPostProcess(controls['雪覆盖']))
  viewer.scene.postProcessStages.add(snowCoverPostProcess);


  const snowPostProcess = new Cesium.PostProcessStage(
      samCzm.getSnowFlyPostProcess(controls['雪速度'],controls['雪花大小']))
  viewer.scene.postProcessStages.add(snowPostProcess);


  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, '雪覆盖', 0, 1).onChange(v=>{
    snowCoverPostProcess.uniforms.alpha = controls['雪覆盖']
  });
  gui.add(controls, '雪速度', 30, 150).onChange(v=>{
    snowPostProcess.uniforms.snowSpeed = controls['雪速度']
  });
  gui.add(controls, '雪花大小', 0, 0.03).onChange(v=>{
    snowPostProcess.uniforms.snowSize = controls['雪花大小']
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