<script setup>
import {onMounted, ref} from "vue";
import {addWallGeojson, initViewer} from "@/utils/cesiumUtils.js";
import { Cesium3DTileset,PostProcessStage,Cartesian3 } from "cesium";
import dat from 'dat.gui'



let viewer = null
const controls =  {
  '雾浓度': 0.8,
  '雾高度': 20,
}

onMounted(async () => {
  viewer = initViewer('cesiumContainer')
  const tileset = viewer.scene.primitives.add(
      await Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset,{duration:1})

  const fs = `
  uniform sampler2D colorTexture;
  uniform sampler2D depthTexture;
  uniform float alpha;
  uniform float height;
  in vec2 v_textureCoordinates;
  out vec4 glColor;

  vec4 toEye(in vec2 uv, in float depth){
    vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));
    vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);
    posInCamera =posInCamera / posInCamera.w;
    return posInCamera;
  }
  float getDepth(in vec4 depth){
    float z_window = czm_unpackDepth(depth);
    z_window = czm_reverseLogDepth(z_window);
    float n_range = czm_depthRange.near;
    float f_range = czm_depthRange.far;
    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);
  }
  void main(){
    vec4 color = texture(colorTexture, v_textureCoordinates);
    vec4 currD = texture(depthTexture, v_textureCoordinates);
    if(currD.r>=1.0){
      glColor = color;
      return;
    }
    float depth = getDepth(currD);
    vec4 positionEC = toEye(v_textureCoordinates, depth);
    vec4 positionWC = czm_inverseView * positionEC;
    // 获取当前点的高度
    glColor = mix(color,vec4(1.0),dotNumWC*alpha);
  }`;
  const snowCoverPostProcess = new PostProcessStage({
    fragmentShader : fs,
    uniforms : {
      alpha : controls['雾浓度'],
      height: controls['雾高度'],

    }
  })
  viewer.scene.postProcessStages.add(snowCoverPostProcess);



  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, '雾浓度', 0, 1).onChange(v=>{
    snowCoverPostProcess.uniforms.alpha = controls['雾浓度']
  });
  gui.add(controls, '雾高度', 0, 100).onChange(v=>{
    snowCoverPostProcess.uniforms.height = controls['雾高度']
  });
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