<script setup>
import {onMounted, ref} from "vue";
import Draw from '@/utils/Draw.js'
import {getAssetsFile} from "@/utils/utils.js";
import * as Cesium from "cesium"
import SamCesiumUtils from "sam-czm-utils";
let viewer,DrawObj,DigTerObj,tileset = null
onMounted(async()=>{
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  DrawObj = new Draw(viewer)
  DigTerObj = new SamCesiumUtils.TerrainClipPlan(viewer, {
    height: depth.value,
    splitNum: 300,
    bottomImg:  getAssetsFile('imgs/digTerrian/bottom.png'),
    wallImg: getAssetsFile('imgs/digTerrian/wall.png'),
  },Cesium)
  tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset)
})

const depth = ref(100)
function digTerrian() {
  const clipPlanes = DigTerObj.getClipPlanes(
      DrawObj.activeShapePoints
  )
  DrawObj.clear()
  try {
    if (tileset){
      const clipTileset = new Cesium.ClippingPlaneCollection({
        planes:clipPlanes,
        edgeWidth: 1,
        edgeColor: Cesium.Color.WHITE,
        modelMatrix: Cesium.Matrix4.inverse(
            Cesium.Transforms.eastNorthUpToFixedFrame(tileset.boundingSphere.center),
            new Cesium.Matrix4()
        )
      })
      tileset.clippingPlanes = clipTileset
    }
  }catch (e) {

  }
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