<script setup>
import {onMounted, ref} from "vue";
import dat from 'dat.gui'
import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";



let viewer = null
let skylinePostProcess = null
let samCzm
const controls =  {
  '物体描边距离': 500,
}

onMounted(async () => {
  samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset, {
    duration: 0,
  })



})

function addSkyLine() {
  skylinePostProcess = samCzm.getSkyLinePostProcess({})
  // skylinePostProcess = getSkyLinePostProcess({})
  viewer.scene.postProcessStages.add(skylinePostProcess);


  // const gui = new dat.GUI();
  // gui.domElement.style = 'position:absolute;top:10px;left:100px;'
  // document.querySelector('.container').appendChild(gui.domElement)
  // gui.add(controls, '物体描边距离', 200, 700).onChange(v=>{
  //   skylinePostProcess.uniforms.mbDis = controls['物体描边距离']
  // });
}
function clear() {

}

</script>

<template>
  <div class="container">
    <div id="cesiumContainer">

    </div>
    <div class="dig-terrian-container MaoBoLi">
      <div class="btn-groups">
        <el-button size="small" @click="addSkyLine">添加天际线</el-button>
        <el-button size="small" @click="clear">清除</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.container {
  width: 100%;
  position: relative;
}
.dig-terrian-container{
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
