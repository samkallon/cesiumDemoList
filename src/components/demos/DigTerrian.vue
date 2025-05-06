<script setup>
import {onMounted, ref} from "vue";
import Draw from '@/utils/Draw.js'
import {getAssetsFile} from "@/utils/utils.js";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer,DrawObj,DigTerObj = null

onMounted(async ()=>{
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMzM3OGE5Yi1lYjc5LTRhNzQtYWFjMC04M2M2MTY3YjFjM2YiLCJpZCI6NDEzMTIsImlhdCI6MTcwMzIwODY4MH0.Hda2inmYARoq6khHSp68tXlk0vPNfNEsenzYLFVLk_k'
  const terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(1)
  samCzm.initViewer({id:'cesiumContainer',viewerOptions:{
      terrainProvider
    }})
  viewer = samCzm.viewer
  viewer.scene.setTerrain(Cesium.Terrain.fromWorldTerrain());

  window.positionList = []

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(e=>{
    window.positionList.push(viewer.scene.pickPosition(e.position))
    console.log(viewer.scene.pickPosition(e.position))
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  DigTerObj = new SamCesiumUtils.Dig({viewer,Cesium,terrainProvider})
  // DigTerObj = new Dig({viewer,Cesium,terrainProvider})

  let car3PositionsList = [
    {
      "x": -2608311.972554344,
      "y": 4739781.168658161,
      "z": 3367086.0111980313
    },
    {
      "x": -2608848.7632152378,
      "y": 4739316.804056444,
      "z": 3367381.837283357
    },
    {
      "x": -2609310.296770105,
      "y": 4739406.49754431,
      "z": 3367010.028764998
    },
    {
      "x": -2609202.488894757,
      "y": 4739587.496149557,
      "z": 3366579.717386761
    },
    {
      "x": -2608757.455719861,
      "y": 4739910.718687603,
      "z": 3366472.3667288125
    },
    {
      "x": -2608311.972554344,
      "y": 4739781.168658161,
      "z": 3367086.0111980313
    },
  ]

  let car3PositionsList1 = [
    {
      "x": -2610517.0227683475,
      "y": 4738237.674631877,
      "z": 3367527.489830222
    },
    {
      "x": -2610084.792005681,
      "y": 4738462.106158829,
      "z": 3367627.1456331466
    },
    {
      "x": -2610052.6877201586,
      "y": 4738932.944991922,
      "z": 3367325.56881989
    },
    {
      "x": -2610463.7836634335,
      "y": 4738914.479418741,
      "z": 3366758.985609183
    },
    {
      "x": -2611156.165767235,
      "y": 4738641.782161234,
      "z": 3366452.226341816
    },
    {
      "x": -2611599.3831017558,
      "y": 4737972.777214594,
      "z": 3367132.6504473058
    },
    {
      "x": -2611474.7370398967,
      "y": 4737608.52892971,
      "z": 3367570.504571957
    },
    {
      "x": -2611126.62015348,
      "y": 4737762.893547854,
      "z": 3367651.0707179997
    },
    {
      "x": -2611043.7150017745,
      "y": 4738115.818968354,
      "z": 3367388.848524231
    },
    {
      "x": -2610517.0227683475,
      "y": 4738237.674631877,
      "z": 3367527.489830222
    },
  ]
  const DigList = [
    {
      depth:50,
      car3PositionsList,
      wallImg: getAssetsFile('imgs/materialImg/digWall.png'),
      bottomImg: getAssetsFile('imgs/materialImg/digBottom1.png'),
      intersectPointsNum: 200, //一条边插值点的数量
    },
    {
      depth:100,
      car3PositionsList:car3PositionsList1,
      wallImg: getAssetsFile('imgs/materialImg/digWall.png'),
      bottomImg: getAssetsFile('imgs/materialImg/digBottom2.png'),
      intersectPointsNum: 200, //一条边插值点的数量
    }
  ]


  viewer.scene.camera.flyTo({
    destination:{
      "x": -2612484.9322967976,
      "y": 4743631.845930956,
      "z": 3365818.6213049176
    },
    orientation:{
      heading:6.216855495139988,
      pitch:-0.7450103687066214,
      roll:0
    },
    complete:()=>{
      DigTerObj.createDig(DigList)

    }
  })
})


</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
<!--    <div class="dig-terrian-container MaoBoLi">-->
<!--      <div style="display: flex; align-items: center; color: white;margin-bottom: 12px">-->
<!--        <div>开挖深度</div>-->
<!--        <el-input-->
<!--            style="margin-left: 10px; margin-right: 10px; width: 80px"-->
<!--            v-model="depth"-->
<!--            size="small"-->
<!--            placeholder="请输入开挖深度"-->
<!--        ></el-input>-->
<!--        <div>米</div>-->
<!--      </div>-->
<!--      <div class="btn-groups">-->
<!--        <el-button size="small" @click="draw">绘制</el-button>-->
<!--        <el-button size="small" @click="digTerrian">开挖</el-button>-->
<!--        <el-button size="small" @click="clear">清除</el-button>-->
<!--      </div>-->
<!--    </div>-->
  </div>

</template>

<style scoped lang="scss">
.container{
  width: 100%;
  height: 100%;
  position: relative;
}
.dig-terrian-container{
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
}

</style>
