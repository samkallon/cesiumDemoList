<script setup>
import {onMounted, ref} from "vue";

import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";
import {getAssetsFile} from "@/utils/utils.js";

let viewer = null
let samCzm
const wallList = [[
  {
    "x": 1532691.0113004209,
    "y": -4465197.970253931,
    "z": 4274384.632662207
  },
  {
    "x": 1532746.191771099,
    "y": -4465198.01788432,
    "z": 4274364.919617005
  },
  {
    "x": 1532786.9859714806,
    "y": -4465066.866502248,
    "z": 4274486.459959381
  },
  {
    "x": 1532733.9624392178,
    "y": -4465065.997455441,
    "z": 4274506.267881826
  }
]]

onMounted(async () => {
  samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );

  samCzm.addWallGeojson({
    wallList,
    maximumHeights: 30,
    minimumHeights: 0,
    imgUrl:getAssetsFile( 'imgs/materialImg/GradientRed.png')
  })
  viewer.scene.camera.flyToBoundingSphere(samCzm.getBoundingSphereFromCartesian3List(wallList[0]),{
    offset: new Cesium.HeadingPitchRoll(0,Cesium.Math.toRadians(-30),0),
    duration:1
  })
})
const curr = ref(1)
function showWall(id,type,imgUrl) {
  curr.value = id
  samCzm.removaEntitiesAndPrimitivesByName('DynamicWall')
  const params = {
    wallList,
    maximumHeights: 30,
    minimumHeights: 0,
    dynamicDir:type,
    imgUrl:getAssetsFile(imgUrl || 'imgs/materialImg/GradientRed.png')
  }
  if (id === 2){
    params.repeat = new Cesium.Cartesian2(10,1)
  }
  samCzm.addWallGeojson(params)
}
</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="dig-terrian-container MaoBoLi">
      <div class="btn-groups">
        <el-button size="small" :type="curr == 1?'primary':''" @click="showWall(1,'shuiPing')">水平墙体1</el-button>
        <el-button size="small" :type="curr == 2?'primary':''" @click="showWall(2,'shuiPing','imgs/materialImg/dynamicWall.png')">水平墙体2</el-button>
        <el-button size="small" :type="curr == 3?'primary':''" @click="showWall(3,'chuiZhi')">垂直墙体1</el-button>
        <el-button size="small" :type="curr == 4?'primary':''" @click="showWall(4,'chuiZhi','imgs/materialImg/dynamicWall.png')">垂直墙体2</el-button>
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