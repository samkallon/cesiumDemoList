<script setup>
import * as Cesium from 'cesium'
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import {getAssetsFile} from "@/utils/utils.js";
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
  const scale = 5
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
    customShader:new Cesium.CustomShader({
      //设置变量，由顶点着色器传递给片元着色器
      varyings: {
        v_normalMC: Cesium.VaryingType.VEC3,
        v_st: Cesium.VaryingType.VEC3
      },
      uniforms: {
        u_texture: {
          value: new Cesium.TextureUniform({
            url: getAssetsFile('imgs/demoFengMian/circle1.png')
          }),
          type: Cesium.UniformType.SAMPLER_2D
        },
        u_scale:{
          type: Cesium.UniformType.FLOAT,
          value:scale
        }
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
              vec2 texCoord = fsInput.attributes.texCoord_0;
              if (positionMC.y > u_scale*0.6 && texCoord.y > -1.25 && texCoord.y < 2.25 && texCoord.x > -2.25 && texCoord.x < 3.25) {
                 rgb = texture(u_texture, texCoord).rgb;
              }
              material.diffuse = rgb;

          }`
    })
  });
  viewer.scene.primitives.add(model1);
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


#cesiumContainer {
  width: 100%;
  height: 90vh;
}
</style>