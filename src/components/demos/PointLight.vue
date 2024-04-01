<script setup>
import {onMounted, ref} from "vue";
import { initViewer} from "@/utils/cesiumUtils.js";
import { Cesium3DTileset,PostProcessStage,Cartesian3,Color,UniformType } from "cesium";

let viewer = null
onMounted(async () => {
  viewer = initViewer('cesiumContainer')
  const tileset = viewer.scene.primitives.add(
      await Cesium3DTileset.fromIonAssetId(354759),
  );
  console.log(Cartesian3.fromDegrees(120,30))
  viewer.flyTo(tileset,{duration:1})
  const fs = `
  uniform sampler2D colorTexture;
  uniform sampler2D depthTexture;
  uniform vec3 u_cameraDirectionWC;
  uniform vec4 u_lightColor;
  uniform vec3 u_lightPosition;
  uniform float u_distance;
  in vec2 v_textureCoordinates;
  out vec4 glColor;
  vec4 toEye(in vec2 uv, in float depth){
      // 将纹理坐标从0-1 转换到-1 到 1
      vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));
      // 将裁剪坐标转换为眼睛坐标
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
      // 对于深度大于1.0，即距离相机很远的点，应用其本身的颜色
      if(currD.r>=1.0){
          glColor = color;
          return;
      }
      float depth = getDepth(currD);

      vec4 positionEC = toEye(v_textureCoordinates, depth);
      vec3 dx = dFdx(positionEC.xyz);
      vec3 dy = dFdy(positionEC.xyz);
      vec3 nor = normalize(cross(dx,dy));
      vec3 normalWC = normalize(czm_inverseViewRotation * nor);
      vec4 positionWC = czm_inverseView * positionEC;
      vec4 positionMC = czm_inverseModel * positionWC; // 得到模型坐标
      vec3 normalEC = normalize(czm_normal3D * czm_geodeticSurfaceNormal(positionMC.xyz, vec3(0.0), vec3(1.0)));
      vec3 v_surfaceToLight = u_lightPosition - positionWC.xyz;
      vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
      float light = dot(normalWC, surfaceToLightDirection);
      glColor = color;
      glColor.rgb *= light;
  }
  `;
  viewer.scene.postProcessStages.add(new PostProcessStage({
    fragmentShader : fs,
    uniforms : {
      u_cameraDirectionWC:{
        type: UniformType.VEC3,
        value: viewer.scene.camera.positionWC,
      },
      u_lightColor: {
        type: UniformType.VEC4,
        value: Color.fromCssColorString('#fff'),
      },
      u_lightPosition: Cartesian3.fromDegrees(42.356631037502524,-71.06027196889957,200),
      u_distance: {
        type: UniformType.FLOAT,
        value: 300
      }
    }
  }));
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