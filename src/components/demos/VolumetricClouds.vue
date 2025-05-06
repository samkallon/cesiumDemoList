<script setup>
// 范围体积云
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import SamCesiumUtils from "sam-czm-utils";
import dat from 'dat.gui'
let guiConfig = {
  'cloudCoverage':0.5
}
let stage,samCzm,viewer

onMounted( async ()=>{
  samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  viewer.scene.debugShowFramesPerSecond = true;
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMzM3OGE5Yi1lYjc5LTRhNzQtYWFjMC04M2M2MTY3YjFjM2YiLCJpZCI6NDEzMTIsImlhdCI6MTcwMzIwODY4MH0.Hda2inmYARoq6khHSp68tXlk0vPNfNEsenzYLFVLk_k";
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.debugShowFramesPerSecond = true;
  viewer.scene.msaaSamples = 4;
  viewer.scene.highDynamicRange = true;
  viewer.postProcessStages.fxaa.enabled = true;

  // const gui = new dat.GUI();
  // gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  // document.querySelector('.container').appendChild(gui.domElement)
  // //改变交互界面style属性
  // gui.add(guiConfig, 'cloudCoverage' , 0, 1).onChange(function (value) {
  //   stage.uniforms.cloudCoverage = value;
  // });

  let position=Cesium.Cartesian3.fromDegrees(-71.08035649839435, 42.37206041690349, 90.62678445553416);

  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  let cameraPosition = {
    "x": 1533896.6344296567,
    "y": -4465177.366385657,
    "z": 4274826.220834804
  }
  let heading = 5.1964852428959825
  let pitch = -0.3092135204244064
  let roll = 0
  viewer.camera.flyTo({
    destination:cameraPosition,
    orientation:{
      heading,pitch,roll
    }
  })
  window.viewer = viewer
  let PostProcessUtils = new SamCesiumUtils.PostProcessUtils({viewer,Cesium})
  PostProcessUtils.add('VolumeCloud',{centerPosition:position})
})



</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<style scoped>
.container{
  height: 100%;
}
#cesiumContainer{
  width: 100%;
  height: 100%;
}
</style>
