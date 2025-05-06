<script setup>
import {onMounted} from "vue";
import * as Cesium from "cesium"
import SamCesiumUtils from "sam-czm-utils";
let viewer,tileset,tileset1,samCzm = null
onMounted(async()=>{
  samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  viewer.scene.debugShowFramesPerSecond = true;
  viewer.imageryLayers.removeAll();
  const layer = viewer.imageryLayers.addImageryProvider(
      await Cesium.IonImageryProvider.fromAssetId(2,{
        mapStyle:'CANVAS_DARK'
      }),
  );
  layer.brightness = 0.3



  // 设置泛光 关闭不需要要的特效 提升性能
  viewer.scene.highDynamicRange = true;
  viewer.scene.postProcessStages.bloom.enabled = true;
  viewer.scene.postProcessStages.bloom.uniforms.contrast = 255
  viewer.scene.postProcessStages.bloom.uniforms.brightness = 0.05
  viewer.scene.postProcessStages.bloom.uniforms.glowOnly = false
  viewer.scene.postProcessStages.bloom.uniforms.delta = 1.1
  viewer.scene.postProcessStages.bloom.uniforms.sigma = 5
  viewer.scene.postProcessStages.bloom.uniforms.stepSize = 0.6
  viewer.scene.postProcessStages.bloom.uniforms.isSelected = false
  viewer.scene.postProcessStages.bloom.uniforms.selectedBloom = 10
  viewer.scene.postProcessStages.bloom.uniforms.bloomColor = Cesium.Color.fromCssColorString("#fafafa");
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.undergroundMode = false;
  viewer.scene.terrainProvider.isCreateSkirt = false;
  viewer.scene.skyAtmosphere.show = false;
  viewer.scene.globe.showGroundAtmosphere = false
  viewer.scene.globe.enableLighting = false
  viewer.scene.fog.enabled = false
  // viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2024-01-15T14:00:00Z");

  tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2539811,{

      }),
  );
  tileset1 = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2539811,{
        debugWireframe: true,
        enableDebugWireframe: true,
      }),
  );
  viewer.camera.setView({
    destination:{
      "x": -2196414.0305486363,
      "y": 5180162.321807583,
      "z": 2994845.400507529
    },
    orientation:new Cesium.HeadingPitchRoll(0.005264386980204705,-0.39973636811014357,0.00002282976960188421)
  })
  const pointLightList = [
    {
      position:Cesium.Cartesian3.fromDegrees(112.9757086853262,28.20774389962781,200),
      color:'#f51e1e',
      radius:900
    },
    {
      position:Cesium.Cartesian3.fromDegrees(112.97679049739413,28.194543502196602,200),
      color:'#40fe01',
      radius:900
    }
  ]
  tileset.customShader = samCzm.getTilesetDynamicShader('#0572cb',pointLightList)
  pointLightList.forEach(e=>{
    viewer.entities.add({
      position:e.position,
      point:{
        pixelSize:20,
        color:Cesium.Color.fromCssColorString(e.color)
      }
    })
  })
  tileset1.customShader = new Cesium.CustomShader({
    mode: Cesium.CustomShaderMode.REPLACE_MATERIAL,
    lightingModel: Cesium.LightingModel.UNLIT,
    uniforms: {
      u_lerp: {
        type: Cesium.UniformType.FLOAT,
        value: 0,
      },
      u_color: {
        type: Cesium.UniformType.VEC4,
        value: Cesium.Color.fromCssColorString("#bedcfd"),
      }
    },
    fragmentShaderText: `
                void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                    vec3 positionMC = fsInput.attributes.positionMC;
                    vec3 positionEC = fsInput.attributes.positionEC;
                    if(u_lerp <positionEC.x && positionEC.x < u_lerp + 350.) {
                        material.diffuse = u_color.rgb;
                        material.alpha = 1.;
                    }else {
                        discard;
                    }
                }
                `
  })
  let step = 20;
  viewer.scene.postUpdate.addEventListener((scene, time) => {
    // 动态线框扫描
    if (tileset1.customShader.uniforms.u_lerp.value < -5000) {
      step = 20;
    } else if (tileset1.customShader.uniforms.u_lerp.value > 5000) {
      step = -20;
    }
    tileset1.customShader.uniforms.u_lerp.value += step;
  })
  // 旋转视角
  const transform = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(112.97553151279656,28.20185937507269))
  viewer.scene.camera.lookAtTransform(transform,new Cesium.HeadingPitchRange(0,-Math.PI / 8,2900))
  viewer.clock.onTick.addEventListener((clock)=>{
    viewer.scene.camera.rotateRight(0.003)
  })
  // 添加路网
  samCzm.addDynamicRoadByGeojsonUrl('/cesiumDemoList/geojson/changShaRoad.json')

})



</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
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
#cesiumContainer{
  width: 100%;
  height: 100%;
}
</style>
