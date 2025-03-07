<script setup>
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";
import {getAssetsFile} from "@/utils/utils.js";
// 动态实体合集
let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer', initCamera:true})
  viewer = samCzm.viewer

  samCzm.kuoSanYuan(
      {
        viewer,
        latlng:[118.75002832190755,32.10208022665707],
        radius:3000,
        color: '#ffe100',
        speed:3.0,
        height:10
      }
  )

  samCzm.addCircleWaterExpand(
      {
        viewer,
        latlng:[118.82596303981823,32.0905147420097],
        radius:3000,
        color: 'rgba(102,245,30,0.94)',
        speed:3.0,
        height:10
      }
  )

  samCzm.addRadar1(
      {
        viewer,
        latlng:[118.80540135701176,32.028391172941205],
        radius:3000,
        color: '#f51e1e',
        speed:3.0,
        height:10
      }
  )

  samCzm.lightenEillposid(
      {
        viewer,
        position:Cesium.Cartesian3.fromDegrees(118.73475136870606,32.04266026635025),
        radii:new Cesium.Cartesian3(3000,3000,3000),
        color: Cesium.Color.fromCssColorString('#00ffff'),
        speed:10.0
      }
  )


  // samCzm.addWeightCircleExpand(
  //     {
  //       latlng:[118.80540135701176,32.028391172941205],
  //       radius:3000,
  //       color: '#ffe100',
  //       speed:3.0,
  //       height:10
  //     }
  // )

  // 随机竖直飞线
  samCzm.lineFlowInit(center, 200);

  let positions = [
    [118.75002832190755,32.10208022665707],
    [118.82596303981823,32.0905147420097],
    [118.80540135701176,32.028391172941205],
    [118.73475136870606,32.04266026635025]
  ]

  // 随机竖直飞线
  samCzm.parabolaFlowLine({center, positions, height: 5000,flowNumInEachLine:3});

  const wallList1 = [
      [
        {
          "x": -2597906.3497642544,
          "y": 4744652.550585159,
          "z": 3367984.5694204466
        },
        {
          "x": -2604327.0658130245,
          "y": 4741959.814474555,
          "z": 3366828.1432527374
        },
        {
          "x": -2604301.675057399,
          "y": 4738379.384784663,
          "z": 3371853.2264088187
        },
        {
          "x": -2597331.0877424185,
          "y": 4741047.252681737,
          "z": 3373466.174204195
        }
      ]
  ]
  samCzm.addWallGeojson({
    wallList:wallList1,
    maximumHeights: 1000,
    minimumHeights: 0,
    dynamicDir:'chuiZhi',
    color:'#fe01fa',
    imgUrl:getAssetsFile( 'imgs/materialImg/GradientRed.png')
  })

  const wallList2 = [
    [
      {
        "x": -2604903.505076758,
        "y": 4737899.566084449,
        "z": 3372059.1932891025
      },
      {
        "x": -2605068.8299003392,
        "y": 4741740.106506805,
        "z": 3366565.7315307753
      },
      {
        "x": -2611714.1035591904,
        "y": 4738840.489986139,
        "z": 3365506.826462975
      },
      {
        "x": -2610869.267971721,
        "y": 4735536.528741928,
        "z": 3370773.3019056204
      }
    ]
  ]
  samCzm.addWallGeojson({
    wallList:wallList2,
    maximumHeights: 1000,
    minimumHeights: 0,
    dynamicDir:'chuiZhi',
    color:'#14bd78',
    imgUrl:getAssetsFile( 'imgs/materialImg/dynamicWall.png')
  })


  const wallList3 = [
    [
      {
        "x": -2598612.5504739913,
        "y": 4748435.205185003,
        "z": 3362145.798454946
      },
      {
        "x": -2605091.921387075,
        "y": 4745575.026000877,
        "z": 3361176.357567095
      },
      {
        "x": -2604589.5594500643,
        "y": 4742212.934381069,
        "z": 3366272.5892701643
      },
      {
        "x": -2598109.629635325,
        "y": 4744932.992680286,
        "z": 3367439.037252133
      }
    ]
  ]
  samCzm.addWallGeojson({
    wallList:wallList3,
    maximumHeights: 1000,
    minimumHeights: 0,
    color:'#00d0ff',
    imgUrl:getAssetsFile( 'imgs/materialImg/GradientRed.png')
  })


  const wallList4 = [
    [
      {
        "x": -2604972.070335167,
        "y": 4742001.097295006,
        "z": 3366275.0766966534
      },
      {
        "x": -2605017.150556503,
        "y": 4745584.646271741,
        "z": 3361220.3015818824
      },
      {
        "x": -2610942.26132409,
        "y": 4743108.29531175,
        "z": 3360125.5388266155
      },
      {
        "x": -2610621.7413572045,
        "y": 4739908.211439423,
        "z": 3364847.990760009
      }
    ]
  ]
  samCzm.addWallGeojson({
    wallList:wallList4,
    maximumHeights: 1000,
    minimumHeights: 0,
    repeat:new Cesium.Cartesian2(8.0, 1.0),
    color:'#fecb01',
    imgUrl:getAssetsFile( 'imgs/materialImg/dynamicWall.png')
  })

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

.dig-terrian-container {
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
