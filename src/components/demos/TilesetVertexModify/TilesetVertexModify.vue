<script setup>
import {onMounted, ref} from "vue";
import {initViewer} from "@/utils/cesiumUtils.js";
import Draw from '@/utils/Draw.js'
import * as Cesium from "cesium"
let viewer,DrawObj,DigTerObj,tileset = null
onMounted(async()=>{
  viewer = initViewer('cesiumContainer')
  DrawObj = new Draw(viewer)
  tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset)
})

const depth = ref(100)
function digTerrian() {
  const arr = DrawObj.activeShapePoints.map((e,i)=>{
    return {
      key:`u_point${i}`,
      value:e
    }
  })
  let uniforms = {}
  arr.forEach(e=>{
    uniforms[e.key] = {
      type:Cesium.UniformType.VEC3,
      value:e.value
    }
  })
  uniforms.height = {
    type:Cesium.UniformType.FLOAT,
    value:100
  }
  let glslStr = DrawObj.activeShapePoints.map((e,i)=>{
    return `point[${i}] = czm_inverseModel * vec4(u_point${i}, 1.);\n`
  })
  glslStr = glslStr.join('')
  let customShader = new Cesium.CustomShader({
    uniforms,
    vertexShaderText: `
              // 判断点是否再多边形内的方法
              bool pointInPolygon(vec3 p, vec4 points[${DrawObj.activeShapePoints.length}]){
                bool inside = false;
                const int length = ${DrawObj.activeShapePoints.length};
                for (int i = 0; i < length; i++) {
                  float xi = points[i].x;
                  float zi = points[i].z;
                  float xj;
                  float zj;
                  if (i == 0) {
                    xj = points[length - 1].x;
                    zj = points[length - 1].z;
                  } else {
                    xj = points[i - 1].x;
                    zj = points[i - 1].z;
                  }
                  bool intersect = ((zi > p.z) != (zj > p.z)) && (p.x < (xj - xi) * (p.z - zi) / (zj - zi) + xi);
                  if (intersect) {
                    inside = !inside;
                  }
                }
                  return inside;
              }

              void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
                // 将左上角点的世界坐标,转换为模型内部坐标
                vec4 point[${DrawObj.activeShapePoints.length}];
                // 将绘制的坐标 转换为模型坐标后 赋值到数组中, 判断函数要用
                ${glslStr}

                // 计算第一个点的模型坐标的高度
                vec4 point1MC = czm_inverseModel * vec4(u_point0,1.);
                // 如果当前顶点在范围内,就把他的顶点高度设成第一个绘制点的模型顶点高度
                if(pointInPolygon(vsOutput.positionMC,point)){
                  // vsOutput.positionMC.z = point1MC.z - 10.;
                  vsOutput.positionMC.z = 100.;
                }
              }
              `
  });
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