<script setup>
import {onMounted, ref} from "vue";
import Draw from '@/utils/Draw.js'
import {getAssetsFile} from "@/utils/utils.js";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer,DrawObj,DigTerObj = null
onMounted(()=>{
  debugger
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  viewer.scene.setTerrain(
      new Cesium.Terrain(
          Cesium.CesiumTerrainProvider.fromIonAssetId(1),
      ),
  );

  DrawObj = new Draw(viewer)
  DigTerObj = new SamCesiumUtils.TerrainClipPlan(viewer, {
    height: depth.value,
    splitNum: 300,
    bottomImg:  getAssetsFile('imgs/digTerrian/bottom.png'),
    wallImg: getAssetsFile('imgs/digTerrian/wall.png'),
  },Cesium)
  viewer.scene.camera.setView({
    destination:{
      "x": -2234804.07681179,
      "y": -4823399.194414375,
      "z": 3515619.778311906
    },
    orientation:{
      heading:0.9814314172375651,
      pitch:-0.40794237974748837,
      roll:0
    }
  })
})

const depth = ref(200)
function digTerrian() {
  DigTerObj.height = depth.value
  DigTerObj.updateTerrainClipData(
      DrawObj.activeShapePoints
  )
  DrawObj.clear()
}

function clear() {
  DrawObj.clear()
  DigTerObj.clear()
}

function draw() {
  DrawObj.startDraw('polygon')
}
</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="dig-terrian-container MaoBoLi">
      <div style="display: flex; align-items: center; color: white;margin-bottom: 12px">
        <div>开挖深度</div>
        <el-input
            style="margin-left: 10px; margin-right: 10px; width: 80px"
            v-model="depth"
            size="small"
            placeholder="请输入开挖深度"
        ></el-input>
        <div>米</div>
      </div>
      <div class="btn-groups">
        <el-button size="small" @click="draw">绘制</el-button>
        <el-button size="small" @click="digTerrian">开挖</el-button>
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
