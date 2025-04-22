<script setup>
import * as Cesium from 'cesium'
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import {getAssetsFile} from "@/utils/utils.js";
import dat from "dat.gui";
let viewer = null
onMounted(async()=>{
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
// try!
  viewer.scene.globe.depthTestAgainstTerrain = true
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
  const scale = 12
  const customShader1 = new Cesium.CustomShader({
    //设置变量，由顶点着色器传递给片元着色器
    varyings: {
      v_normalMC: Cesium.VaryingType.VEC3,
      v_st: Cesium.VaryingType.VEC3
    },
    uniforms: {
      u_texture: {
        value: new Cesium.TextureUniform({
          url: getAssetsFile('imgs/demoFengMian/default.png'),
        }),
        type: Cesium.UniformType.SAMPLER_2D
      },
    },
    vertexShaderText: `
            void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
                  v_normalMC = vsInput.attributes.normalMC;
                  v_st=vsInput.attributes.positionMC ;
            }`,
    fragmentShaderText: `
           void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
              vec3 positionMC = fsInput.attributes.positionMC;
              //这里是设置要贴图的图片的尺寸，设置小了会重复
              vec3 rgb;
              rgb = material.diffuse;
              material.diffuse = rgb;

          }`
  })
  const model1 = await Cesium.Model.fromGltfAsync({
    url: "/cesiumDemoList/model/Billboard_001.glb",
    scale,
    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
        Cesium.Cartesian3.fromDegrees(118.7911920757646,32.07496138823535,5.0),
        new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(120),0,0),
        Cesium.Ellipsoid.WGS84,
        Cesium.Transforms.localFrameToFixedFrameGenerator(
            "north",
            "west"
        )
    ),
    customShader:customShader1
  });
  viewer.scene.primitives.add(model1);
  const controls = {
    u_positionYMin:0.72,
    u_positionYMax:1.5,
    u_positionXMin:0.72,
    u_positionXMax:1.5,
    u_positionZMin:0.044,
    u_positionZMax:0.0441,
    u_texCoordOffsetX:-3,
    u_texCoordOffsetY:-2.5,
    u_texCoordScale:4,
  }
  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, 'u_positionYMin', -5, 5).onChange(v=>{
    customShader1.setUniform('u_positionYMin',controls['u_positionYMin'])
  });
  gui.add(controls, 'u_positionYMax', -5, 5).onChange(v=>{
    customShader1.setUniform('u_positionYMax',controls['u_positionYMax'])
  });
  gui.add(controls, 'u_positionXMin', -5, 5).onChange(v=>{
    customShader1.setUniform('u_positionXMin',controls['u_positionXMin'])
  });
  gui.add(controls, 'u_positionXMax', -5, 5).onChange(v=>{
    customShader1.setUniform('u_positionXMax',controls['u_positionXMax'])
  });
  gui.add(controls, 'u_positionZMin', 0, 0.05).onChange(v=>{
    customShader1.setUniform('u_positionZMin',controls['u_positionZMin'])
  });
  gui.add(controls, 'u_positionZMax', 0.03, 0.05).onChange(v=>{
    customShader1.setUniform('u_positionZMax',controls['u_positionZMax'])
  });
  gui.add(controls, 'u_texCoordOffsetX', -10, 10).onChange(v=>{
    customShader1.setUniform('u_texCoordOffsetX',controls['u_texCoordOffsetX'])
  });
  gui.add(controls, 'u_texCoordOffsetY', -10, 10).onChange(v=>{
    customShader1.setUniform('u_texCoordOffsetY',controls['u_texCoordOffsetY'])
  });
  gui.add(controls, 'u_texCoordScale', 4, 10).onChange(v=>{
    customShader1.setUniform('u_texCoordScale',controls['u_texCoordScale'])
  });
  const model2 = await Cesium.Model.fromGltfAsync({
    url: "/cesiumDemoList/model/Billboard_002.glb",
    scale,
    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
        Cesium.Cartesian3.fromDegrees(118.79256551551657,32.07536775632222,5.0),
        new Cesium.HeadingPitchRoll(),
        Cesium.Ellipsoid.WGS84,
        Cesium.Transforms.localFrameToFixedFrameGenerator(
            "north",
            "west"
        )
    ),
  });
  viewer.scene.primitives.add(model2);
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



</style>
