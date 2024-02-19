<script setup>
import {onMounted, ref} from "vue";
import {initViewer} from "@/utils/cesiumUtils.js";
import Draw from '@/utils/cesiumUtils.js'
import TerrainClipPlan from "@/components/demos/DigTerrian/TerrainClipPlan.js";
import {getAssetsFile} from "@/utils/utils.js";
let viewer,DrawObj,DigTerObj = null
onMounted(()=>{
  viewer = initViewer('cesiumContainer')
  DrawObj = new Draw(viewer)
  DigTerObj = new TerrainClipPlan(viewer, {
    height: depth.value,
    splitNum: 300,
    bottomImg:  getAssetsFile('imgs/digTerrian/bottom.png'),
    wallImg: getAssetsFile('imgs/digTerrian/wall.png'),
  })
})

const depth = ref(100)
function digTerrian() {
  DigTerObj.height = depth.value
  DigTerObj.updateTerrainClipData(
      DrawObj.polygonPoints
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
    <div class="dig-terrian-container">
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
  @include MaoBoLi(rgba(255, 255, 255, 0.37));
}
#cesiumContainer{
  width: 100%;
  height: 90vh;
}
</style>