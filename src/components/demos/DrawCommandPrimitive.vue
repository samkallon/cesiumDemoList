<script setup>
import * as Cesium from 'cesium'
import {onMounted} from "vue";
import {initViewer} from "../../utils/cesiumUtils.js";
let viewer = null
onMounted(async()=>{
  viewer = initViewer('cesiumContainer')
// try!
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.primitives.add(new StaticTrianglePrimitive(modelMatrix))
  viewer.camera.setView({
    destination:{
      "x": -2605877.6351897535,
      "y": 4741170.8930678805,
      "z": 3367173.3836399023
    },
    orientation:{
      heading:6.03062824032168,
      pitch:-0.3269054991435494,
      roll:6.283184968930444
    }
  })
})

const modelCenter = Cesium.Cartesian3.fromDegrees(118.79304711609575, 32.07511800768333, 0)
const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(modelCenter)

const vertexShaderText = `
in vec3 a_color;
in vec3 position;

out vec3 o_color;
void main() {
  vec3 positonTemp = position;
  positonTemp.z += abs(sin(czm_frameNumber*10. /1000.0)) * 30.;
  positonTemp.x = position.x * cos(czm_frameNumber*3. /1000.0) - position.y * sin(czm_frameNumber*3. /1000.0);
  positonTemp.y = position.x * sin(czm_frameNumber*3. /1000.0) + position.y * cos(czm_frameNumber*3. /1000.0);
  gl_Position = czm_projection * czm_view * czm_model * vec4(positonTemp, 1.0);
  o_color = a_color;
}`
const fragmentShaderText = `
uniform vec3 u_color;
in vec3 o_color;
out vec4 fsOutput;
void main(){
  // 变色钻石
  fsOutput = vec4(abs(cos(czm_frameNumber*3./1000.)),o_color.y,fract(cos(czm_frameNumber*3./1000.)),1.0);
  // fsOutput = vec4(o_color,1.0);
}`
// 六边形钻石体的最下面的点
const sourceCenter = [0,0,0]
// 上层小六边形的点集合
const upperPoints = [
  [40,0,110],
  [40*Math.cos(Cesium.Math.toRadians(60)),40*Math.sin(Cesium.Math.toRadians(60)),110],
  [40*Math.cos(Cesium.Math.toRadians(120)),40*Math.sin(Cesium.Math.toRadians(120)),110],
  [40*Math.cos(Cesium.Math.toRadians(180)),40*Math.sin(Cesium.Math.toRadians(180)),110],
  [40*Math.cos(Cesium.Math.toRadians(240)),40*Math.sin(Cesium.Math.toRadians(240)),110],
  [40*Math.cos(Cesium.Math.toRadians(300)),40*Math.sin(Cesium.Math.toRadians(300)),110]
]
// 下层大六边形的点集合
const lowerPoints = [
  [60,0,80],
  [60*Math.cos(Cesium.Math.toRadians(60)),60*Math.sin(Cesium.Math.toRadians(60)),80],
  [60*Math.cos(Cesium.Math.toRadians(120)),60*Math.sin(Cesium.Math.toRadians(120)),80],
  [60*Math.cos(Cesium.Math.toRadians(180)),60*Math.sin(Cesium.Math.toRadians(180)),80],
  [60*Math.cos(Cesium.Math.toRadians(240)),60*Math.sin(Cesium.Math.toRadians(240)),80],
  [60*Math.cos(Cesium.Math.toRadians(300)),60*Math.sin(Cesium.Math.toRadians(300)),80]
]
const createCommand = (frameState, matrix) => {
  const attributeLocations = {
    "position": 0,
    "a_color":1
  }
  const uniformMap = {
    u_color() {
      return Cesium.Color.HONEYDEW
    },
  }
  // 绘制六边形钻石体 顶层面为边长为40的正六边形,往下平移30米
  const positionBuffer = Cesium.Buffer.createVertexBuffer({
    usage: Cesium.BufferUsage.STATIC_DRAW,
    typedArray: new Float32Array([
      // 底部侧面
      sourceCenter,lowerPoints[1],lowerPoints[0], //代表一个面
      sourceCenter,lowerPoints[2],lowerPoints[1],
      sourceCenter,lowerPoints[3],lowerPoints[2],
      sourceCenter,lowerPoints[4],lowerPoints[3],
      sourceCenter,lowerPoints[5],lowerPoints[4],
      sourceCenter,lowerPoints[0],lowerPoints[5],
      // 中部侧面,以lower为底边
      lowerPoints[0],lowerPoints[1],upperPoints[0],
      lowerPoints[1],lowerPoints[2],upperPoints[1],
      lowerPoints[2],lowerPoints[3],upperPoints[2],
      lowerPoints[3],lowerPoints[4],upperPoints[3],
      lowerPoints[4],lowerPoints[5],upperPoints[4],
      lowerPoints[5],lowerPoints[0],upperPoints[5],
      // 中部侧面,以upper为底边 // 保证逆时针,否则会被剔除
      upperPoints[1],upperPoints[0],lowerPoints[1],
      upperPoints[2],upperPoints[1],lowerPoints[2],
      upperPoints[3],upperPoints[2],lowerPoints[3],
      upperPoints[4],upperPoints[3],lowerPoints[4],
      upperPoints[5],upperPoints[4],lowerPoints[5],
      upperPoints[0],upperPoints[5],lowerPoints[0],
      // 顶部封口的面,共由四个三角面组成
      upperPoints[0],upperPoints[1],upperPoints[5],
      upperPoints[1],upperPoints[2],upperPoints[3],
      upperPoints[3],upperPoints[4],upperPoints[5],
      upperPoints[1],upperPoints[3],upperPoints[5],
    ].flat(1)),
    context: frameState.context,
  })
  // 返回 [[1,0,0],[1,0,0],[1,0,0]] 三个顶点都为红色
  function get3PointsColor(color) {
    const colorTemp = Cesium.Color.fromCssColorString(color)
    return [[colorTemp.red, colorTemp.green, colorTemp.blue],
            [colorTemp.red, colorTemp.green, colorTemp.blue],
            [colorTemp.red, colorTemp.green, colorTemp.blue]]
  }
  const colorBuffer = Cesium.Buffer.createVertexBuffer({
    usage: Cesium.BufferUsage.STATIC_DRAW,
    typedArray: new Float32Array([
      // 保证逆时针,否则会被剔除
      // 底部侧面颜色 每个顶点的颜色
      get3PointsColor('#a6abbb'),
      get3PointsColor('#565d6a'),
      get3PointsColor('#898d93'),
      get3PointsColor('#c6c7d4'),
      get3PointsColor('#a6abbb'),
      get3PointsColor('#d8dee0'),
      // 中部侧面,以lower为底边
      get3PointsColor('#edf0f6'),
      get3PointsColor('#85a3c3'),
      get3PointsColor('#97a5b0'),
      get3PointsColor('#b6aeb4'),
      get3PointsColor('#6f757f'),
      get3PointsColor('#a6abbb'),
      // 中部侧面,以upper为底边
      get3PointsColor('#d3d8e0'),
      get3PointsColor('#6c7b83'),
      get3PointsColor('#93afcd'),
      get3PointsColor('#6b85a5'),
      get3PointsColor('#636d75'),
      get3PointsColor('#a6abbb'),
      // 顶部封口的面,共由四个三角面组成
      get3PointsColor('#e7edf6'),
      get3PointsColor('#a9b4ba'),
      get3PointsColor('#a3a9a9'),
      get3PointsColor('#a6abbb'),
    ].flat(2)),
    context: frameState.context,
  })
  const vertexArray = new Cesium.VertexArray({
    context: frameState.context,
    attributes: [{
      index: 0, // 等于 attributeLocations['position']
      vertexBuffer: positionBuffer,
      componentsPerAttribute: 3,
      componentDatatype: Cesium.ComponentDatatype.FLOAT
    },
      {
        index: 1, // 等于 attributeLocations['a_color']
        vertexBuffer: colorBuffer,
        componentsPerAttribute: 3,
        componentDatatype: Cesium.ComponentDatatype.FLOAT
      },
    ]
  })

  const program = Cesium.ShaderProgram.fromCache({
    context: frameState.context,
    vertexShaderSource: vertexShaderText,
    fragmentShaderSource: fragmentShaderText,
    attributeLocations: attributeLocations,
  })
  const renderState = Cesium.RenderState.fromCache({
    depthTest: {
      enabled: true
    },
    cull: {
      enabled: true,
      face: Cesium.CullFace.BACK
    }
  })
  return new Cesium.DrawCommand({
    modelMatrix: matrix,
    vertexArray: vertexArray,
    shaderProgram: program,
    uniformMap: uniformMap,
    renderState: renderState,
    pass: Cesium.Pass.OPAQUE,
  })
}

/* ----- See Here ↓ ------ */

class StaticTrianglePrimitive {
  /**
   * @param {Matrix4} modelMatrix matrix to WorldCoordinateSystem
   */
  constructor(modelMatrix) {
    this._modelMatrix = modelMatrix
  }

  /**
   * @param {FrameState} frameState
   */
  update(frameState) {
    const command = createCommand(frameState, this._modelMatrix)
    frameState.commandList.push(command)
  }

  isDestroyed(){
    return false
  }
}


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


#cesiumContainer {
  width: 100%;
  height: 90vh;
}
</style>