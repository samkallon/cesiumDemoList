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
  DrawObj = new Draw(viewer)
  tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2539804),
  );
  viewer.zoomTo(tileset);
  const controls =  {
    'u_height': 100
  }
  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:0px;left:200px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, 'u_height', -200, 200).onChange(v=>{
    tileset.customShader.setUniform('u_height',controls['u_height'])
  });
})
function digTerrian() {
  let customShader = samCzm.getVertexChangeHeightCustomShader(DrawObj.activeShapePoints)
  DrawObj.clear()
  tileset.customShader = customShader;
}


function clear() {
  DrawObj.clear()
  tileset.clippingPlanes.removeAll()
}

function draw() {
  DrawObj.startDraw('polygon')
}
</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="dig-terrian-container MaoBoLi">
      <div class="btn-groups">
        <el-button size="small" @click="draw">绘制</el-button>
        <el-button size="small" @click="digTerrian">调整</el-button>
        <el-button size="small" @click="clear">清除</el-button>
      </div>
    </div>
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