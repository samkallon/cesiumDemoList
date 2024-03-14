<script setup>
import {onMounted, ref} from "vue";
import {addWallGeojson, initViewer} from "@/utils/cesiumUtils.js";
import { Cesium3DTileset,PostProcessStage,Cartesian3 } from "cesium";
import dat from 'dat.gui'
import * as Cesium from "cesium";



let viewer = null
const controls =  {
  '雾浓度': 0.88,
  '雾高度': 73,
}

onMounted(async () => {
  viewer = initViewer('cesiumContainer')
  const tileset = viewer.scene.primitives.add(
      await Cesium3DTileset.fromIonAssetId(354759),
  );
  // viewer.scene.setTerrain(Cesium.Terrain.fromWorldTerrain())

  const fs = `
  uniform sampler2D colorTexture;
  uniform sampler2D depthTexture;
  uniform float alpha;
  uniform float height;
  uniform vec3 oneOverRadii;
  uniform vec3 oneOverRadiiSquared;
  uniform float centerToleranceSquared;
  uniform float EPSILON12;
  uniform float earthRadius;


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


  vec3 getWorldCoordinateFromDepth(in vec4 currD){
    float depth = czm_unpackDepth(currD);
    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    vec4 worldCoordinate4 = czm_inverseView * eyeCoordinate;
    vec3 worldCoordinate = worldCoordinate4.xyz / worldCoordinate4.w;
    return worldCoordinate;
  }

  // 将经纬度转换为世界坐标,单位是弧度
  // vec3 getWorldPosition(float longitude,float latitude,float height) {
  //    float cosLatitude = cos(latitude);
  //    vec3 scratchN = vec3(cosLatitude * cos(longitude),cosLatitude * sin(longitude),sin(latitude));
  //    scratchN = normalize(scratchN);
  //    vec3 scratchK = vec3(rx * rx * scratchN.x, ry * ry * scratchN.y, rz * rz * scratchN.z);
  //     float gamma = sqrt(scratchN.x * scratchK.x + scratchN.y * scratchK.y + scratchN.z * scratchK.z);
  //    scratchK = scratchK.xyz / gamma;
  //    scratchN = scratchN.xyz * height;
  //    return scratchK + scratchN;
  // }

  float magnitude(in vec3 v){
    return sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  // 沿大地表面法线缩放提供的笛卡尔位置,使其位于该椭球体的表面上
  vec3 scaleToGeodeticSurface(in vec3 cartesian){
    float positionX = cartesian.x;
    float positionY = cartesian.y;
    float positionZ = cartesian.z;
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

    float lambda = ((1.0 - ratio) * magnitude(cartesian) ) / (0.5 * magnitude(gradient));
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

        float func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;

        float denominator =
          x2 * xMultiplier3 * oneOverRadiiSquaredX +
          y2 * yMultiplier3 * oneOverRadiiSquaredY +
          z2 * zMultiplier3 * oneOverRadiiSquaredZ;

        float derivative = -2.0 * denominator;

        correction = func / derivative;
    } while (abs(func) > EPSILON12);
    return vec3(positionX * xMultiplier, positionY * yMultiplier, positionZ * zMultiplier);
  }

  vec3 multiplyComponents(in vec3 left,in vec3 right){
    return vec3(left.x * right.x, left.y * right.y, left.z * right.z);
  }


  // 将世界坐标转为经纬度高度
  vec3 getCartographicFromCartesian3(in vec3 cartesian){
    vec3 p = scaleToGeodeticSurface(cartesian);
    vec3 n = multiplyComponents(p,oneOverRadiiSquared);
    n = normalize(n);
    vec3 h = cartesian - p;

    float longitude = atan(n.y, n.x);
    float latitude = asin(n.z);
    float height = sign(dot(h, cartesian)) * magnitude(h);

    return vec3(longitude,latitude,height);
  }

  // 计算每个像素点的高度 通过计算相机所在位置的地球半径作为每个点的地球半径,然后用每个点的length减去半径得到近似的高度
  float getHeight(in vec4 currD){
    // 传入每个点的世界坐标
    float altitude = 0.0;
    float depth = czm_unpackDepth(currD);
    if (depth == 0.0) {
      altitude = czm_infinity;
    }
    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    float distance = -eyeCoordinate.z / eyeCoordinate.w;
    vec4 worldCoordinate4 = czm_inverseView * eyeCoordinate;
    vec3 worldCoordinate = worldCoordinate4.xyz / worldCoordinate4.w;
    altitude = length(worldCoordinate.xyz) - earthRadius;
    return altitude;
  }

  void main(){
    vec4 color = texture(colorTexture, v_textureCoordinates);
    vec4 currD = texture(depthTexture, v_textureCoordinates);
    if(currD.r>=1.0){
      glColor = color;
      return;
    }
    // 此方法有问题 会闪烁
    float depth = getDepth(currD);
    vec4 positionEC = toEye(v_textureCoordinates, depth);
    vec4 positionWC = czm_inverseView * positionEC;
    // 获取当前点的高度
    // vec3 positionWC = getWorldCoordinateFromDepth(currD);
    vec3 cartographic = getCartographicFromCartesian3(vec3(positionWC.x,positionWC.y,positionWC.z));
    float pointHeight = cartographic.z + 10.;
    // 这个不闪烁 但是旋转相机会有部分地表没有雾
    // float pointHeight = getHeight(currD);
    // 当前点高度越高,雾浓度越小,高度达到设定高度,雾浓度为0,同时乘以深度,距离越远,浓度越大
    float fog =  (height/pointHeight - 1.);
    fog = clamp(fog, 0.0, 1.0);
    glColor = mix(color,vec4(1.0,1.,1.,1),fog*alpha);

  }`;

  let snowCoverPostProcess
  viewer.flyTo(tileset, {
    duration: 0,
  })
  snowCoverPostProcess = new PostProcessStage({
    fragmentShader: fs,
    uniforms: {
      alpha: controls['雾浓度'],
      height: controls['雾高度'],
      oneOverRadii: Cesium.Ellipsoid.WGS84.oneOverRadii,
      oneOverRadiiSquared: Cesium.Ellipsoid.WGS84.oneOverRadiiSquared,
      centerToleranceSquared: Cesium.Ellipsoid.WGS84._centerToleranceSquared,
      EPSILON12: Cesium.Math.EPSILON12,
      // earthRadius: Cesium.Cartesian3.magnitude(viewer.camera.positionWC) - viewer.camera.positionCartographic.height
      earthRadius: function () {
        // 获取相机所在处的地球半径
        const height = Cesium.Cartesian3.magnitude(viewer.camera.positionWC) - viewer.camera.positionCartographic.height
        console.log(height)
        return height
      }
    }
  })
  viewer.scene.postProcessStages.add(snowCoverPostProcess);


  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, '雾浓度', 0, 1).onChange(v=>{
    snowCoverPostProcess.uniforms.alpha = controls['雾浓度']
  });
  gui.add(controls, '雾高度', 0, 300).onChange(v=>{
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