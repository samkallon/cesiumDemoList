<script setup>
import {onMounted, ref} from "vue";
import {addWallGeojson, initViewer} from "@/utils/cesiumUtils.js";
import { Cesium3DTileset,PostProcessStage,Cartesian3 } from "cesium";
import dat from 'dat.gui'
import * as Cesium from "cesium";



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
  uniform vec3 oneOverRadii;
  uniform vec3 oneOverRadiiSquared;
  uniform float centerToleranceSquared;
  uniform float EPSILON12;


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
  // 将经纬度转换为世界坐标,单位是弧度
  vec3 getWorldPosition(float longitude,float latitude,float height) {
     float cosLatitude = cos(latitude);
     vec3 scratchN = vec3(cosLatitude * cos(longitude),cosLatitude * sin(longitude),sin(latitude));
     scratchN = normalize(scratchN);
     vec3 scratchK = vec3(rx * rx * scratchN.x, ry * ry * scratchN.y, rz * rz * scratchN.z);
      float gamma = sqrt(scratchN.x * scratchK.x + scratchN.y * scratchK.y + scratchN.z * scratchK.z);
     scratchK = scratchK.xyz / gamma;
     scratchN = scratchN.xyz * height;
     return scratchK + scratchN;
  }

  float magnitude(vec3 v){
    return sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  // 沿大地表面法线缩放提供的笛卡尔位置,使其位于该椭球体的表面上
  vec3 scaleToGeodeticSurface(vec3 cartesian){
    float x2 = cartesian.x * cartesian.x * oneOverRadii.x * oneOverRadii.x;
    float y2 = cartesian.y * cartesian.y * oneOverRadii.y * oneOverRadii.y;
    float z2 = cartesian.z * cartesian.z * oneOverRadii.z * oneOverRadii.z;

    float squaredNorm = x2 + y2 + z2;
    float ratio = sqrt(1.0 / squaredNorm);
    vec3 intersection = cartesian * ratio;

    float oneOverRadiiSquaredX = oneOverRadiiSquared.x;
    float oneOverRadiiSquaredY = oneOverRadiiSquared.y;
    float oneOverRadiiSquaredZ = oneOverRadiiSquared.z;

    vec3 gradient = vec3(intersection.x * oneOverRadiiSquaredX * 2.0,intersection.y * oneOverRadiiSquaredY * 2.0,intersection.z * oneOverRadiiSquaredZ * 2.0);

    float lambda = ((1.0 - ratio) * magnitude(gradient) ) / (0.5 * magnitude(gradient));
    float correction = 0.0;
    float func = 0.0;
    float denominator = 0.0;
    float xMultiplier = 0.0;
    float yMultiplier = 0.0;
    float zMultiplier = 0.0;
    float xMultiplier2 = 0.0;
    float yMultiplier2 = 0.0;
    float zMultiplier2 = 0.0;
    float xMultiplier3 = 0.0;
    float yMultiplier3 = 0.0;
    float zMultiplier3 = 0.0;
    do {
        lambda -= correction;

        xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
        yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
        zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);

        xMultiplier2 = xMultiplier * xMultiplier;
        yMultiplier2 = yMultiplier * yMultiplier;
        zMultiplier2 = zMultiplier * zMultiplier;

        xMultiplier3 = xMultiplier2 * xMultiplier;
        yMultiplier3 = yMultiplier2 * yMultiplier;
        zMultiplier3 = zMultiplier2 * zMultiplier;

        func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;

        // "denominator" here refers to the use of this expression in the velocity and acceleration
        // computations in the sections to follow.
        denominator =
          x2 * xMultiplier3 * oneOverRadiiSquaredX +
          y2 * yMultiplier3 * oneOverRadiiSquaredY +
          z2 * zMultiplier3 * oneOverRadiiSquaredZ;

        const derivative = -2.0 * denominator;

        correction = func / derivative;
    } while (abs(func) > EPSILON12);
    return vec3(positionX * xMultiplier, positionY * yMultiplier, positionZ * zMultiplier);
  }

  vec3 multiplyComponents(vec3 left,vec3 right){
    return vec3(left.x * right.x, left.y * right.y, left.z * right.z);
  }


  // 将世界坐标转为经纬度高度
  vec3 getCartographicFromCartesian3(vec3 cartesian3){
    vec3 p = scaleToGeodeticSurface(cartesian);
    vec3 n = multiplyComponents(p,oneOverRadiiSquared);
    n = normalize(n)
    vec3 h = cartesian - p;

    const longitude = atan2(n.y, n.x);
    const latitude = asin(n.z);
    const height = sign(Cartesian3.dot(h, cartesian)) * magnitude(h);

    return vec3(longitude,latitude,height);
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
      oneOverRadii: Cesium.Ellipsoid.WGS84.wgs84OneOverRadii,
      oneOverRadiiSquared: Cesium.Ellipsoid.WGS84.oneOverRadiiSquared,
      centerToleranceSquared : Cesium.Ellipsoid.WGS84._centerToleranceSquared,
      EPSILON12:Cesium.Math.EPSILON12
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