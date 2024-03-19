<script setup>
const viewer = new Cesium.Viewer("cesiumContainer");
viewer.scene.sun = new Cesium.Sun();

const modelCenter = Cesium.Cartesian3.fromDegrees(112, 23, 0)
const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(modelCenter)

const vertexShaderText = `
in vec3 a_color;
in vec3 position;

out vec3 o_color;
void main() {
  gl_Position = czm_projection * czm_view * czm_model * vec4(position, 1.0);
  o_color = a_color;
}`
const fragmentShaderText = `
uniform vec3 u_color;
in vec3 o_color;
out vec4 fsOutput;
void main(){
  fsOutput = vec4(o_color,1.0);
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
  const colorBuffer = Cesium.Buffer.createVertexBuffer({
    usage: Cesium.BufferUsage.STATIC_DRAW,
    typedArray: new Float32Array([
      // 保证逆时针,否则会被剔除
      // 底部侧面颜色 每个顶点的颜色
      [1,0,0],[1,0,0],[1,0,0],
      [1,0,0],[1,0,0],[1,0,0],
      [1,0,0],[1,0,0],[1,0,0],
      [1,0,0],[1,0,0],[1,0,0],
      [1,0,0],[1,0,0],[1,0,0],
      [1,0,0],[1,0,0],[1,0,0],
      // 中部侧面,以lower为底边
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      // 中部侧面,以upper为底边
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      [1,1,0],[1,1,0],[1,1,0],
      // 顶部封口的面,共由四个三角面组成
      [1,0,1],[1,0,1],[1,0,1],
      [1,0,1],[1,0,1],[1,0,1],
      [1,0,1],[1,0,1],[1,0,1],
      [1,0,1],[1,0,1],[1,0,1],
    ].flat(1)),
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

// try!
viewer.scene.globe.depthTestAgainstTerrain = true
viewer.scene.primitives.add(new StaticTrianglePrimitive(modelMatrix))
viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(112, 23, 200),duration:1});
</script>

<template>

</template>

<style scoped lang="scss">

</style>