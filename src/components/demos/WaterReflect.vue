<script setup>
import {onMounted, ref} from "vue";
import dat from 'dat.gui'
import * as Cesium from "cesium";
import SamCesiumUtils from "sam-czm-utils";



let viewer = null
const controls =  {
  '雾浓度': 0.88,
  '雾高度': 73,
}

onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium:Cesium})
  samCzm.initViewer({id:'cesiumContainer'})
  viewer = samCzm.viewer
  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  viewer.flyTo(tileset, {
    duration: 0,
  })


  let snowCoverPostProcess

  snowCoverPostProcess = samCzm.getFogPostProcess(controls['雾浓度'],controls['雾高度'])
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

  const WaterMaterialSource = `
    uniform sampler2D reflexTexture; // 反射贴图
    uniform sampler2D normalTexture; // 法线贴图
    uniform float time;

    uniform mat4 fixedFrameToEastNorthUpTransform; // 水面的东北天矩阵的逆矩阵

    // 从顶点着色器传来的
    in vec4 v_worldPosition; // 当前像素的世界坐标
    in vec4 v_uv; // 原本的纹理坐标乘以贴图矩阵

    // 可配置的参数
    uniform float size; // 波纹大小（数值越大波纹越密集）
    uniform vec4 waterColor; // 水面颜色
    uniform float waterAlpha; // 水面透明度
    uniform float rf0; // 水面反射率
    uniform vec3 lightDirection; // 光照方向
    uniform float sunShiny; // 光照强度
    uniform float distortionScale; // 倒影的扭曲程度

    const vec3 sunColor = vec3( 1.0 );


    // 获取噪声
    // vec4 czm_getWaterNoise(sampler2D normalMap, vec2 uv, float time, float angleInRadians)
    vec4 getNoise( sampler2D normalMap, vec2 uv ) {
        vec2 uv0 = ( uv / 103.0 ) + vec2( time / 17.0, time / 29.0 );
        vec2 uv1 = uv / 107.0 - vec2( time / -19.0, time / 31.0 );
        vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
        vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
        vec4 noise = texture( normalMap, uv0 ) +
            texture( normalMap, uv1 ) +
            texture( normalMap, uv2 ) +
            texture( normalMap, uv3 );
        return noise * 0.5 - 1.0;
    }

    void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
        vec3 sunDirection = normalize( lightDirection );
        vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );  // 获得太阳对表面法线的反射向量
        float direction = max( 0.0, dot( eyeDirection, reflection ) );  // 当太阳反射方向和眼睛的方向一致时，direction 最大，为 1，当角度大于 90度时最小，最小为 0
        specularColor += pow( direction, shiny ) * sunColor * spec;
        diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
    }

    czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);

        // 通过法线贴图计算新的表面法线
        vec2 transformedSt = materialInput.st * 2.0 - 1.0;  // [0, 1] => [-1, 1]
        vec4 noise = getNoise( normalTexture, transformedSt * size );
        vec3 surfaceNormal = normalize( noise.xzy );  // [0, +1]，Y up

        // 漫反射光
        vec3 diffuseLight = vec3( 0.0 );
        // 高光
        vec3 specularLight = vec3( 0.0 );

        // 获取视线方向（世界坐标）
        vec3 eye = ( czm_inverseView * vec4( vec3(0.0), 1.0 ) ).xyz;
        // 获取视线方向（水面的本地坐标）
        eye = ( fixedFrameToEastNorthUpTransform * vec4( eye, 1.0) ).xyz;
        // 当前像素的本地坐标
        vec3 world = ( fixedFrameToEastNorthUpTransform * vec4( v_worldPosition.xyz, 1.0) ).xyz;

        vec3 worldToEye = eye - world;  // east, north, up
        worldToEye = vec3( worldToEye.x, worldToEye.z, -worldToEye.y );  // Y up
        vec3 eyeDirection = normalize( worldToEye );

        float shiny = sunShiny;
        float spec = 2.0;
        float diffuse = 0.5;
        sunLight( surfaceNormal, eyeDirection, shiny, spec, diffuse, diffuseLight, specularLight );

        float distance = length( worldToEye );
        float distortionScale = distortionScale;
        vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
        vec3 reflectionSample = vec3( texture( reflexTexture, (v_uv.xy / v_uv.w) * 0.5 + 0.5 + distortion ) );

        float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
        float rf0 = rf0;
        float reflectance = mix( rf0, 1.0, pow( 1.0 - theta, 5.0 ) );

        vec3 waterColor = waterColor.rgb;

        // surfaceNormal 是以反射平面为 X-Y 平面的，
        // 所以 eyeDirection 也得是以反射平面为 X-Y 平面。
        vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
        vec3 albedo = mix(
            sunColor * diffuseLight * 0.3 + scatter,
            vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight,
            reflectance
        );
        material.diffuse = albedo.rgb;
        material.alpha = waterAlpha;

        return material;
    }
  `

  const WaterAppearanceVS = `
    in vec3 position3DHigh;
    in vec3 position3DLow;
    in vec3 normal;
    in vec2 st;
    in float batchId;

    out vec3 v_positionEC;
    out vec3 v_normalEC;
    out vec2 v_st;

    uniform mat4 reflectorProjectionMatrix;
    uniform mat4 reflectorViewMatrix;
    uniform mat4 reflectMatrix;
    out vec4 v_worldPosition;  // 世界坐标
    out vec4 v_uv;             // 纹理坐标



    void main()
    {
      vec4 p = czm_computePosition();

      v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
      v_normalEC = czm_normal * normal;                         // normal in eye coordinates
      v_st = st;


      mat4 modelView = reflectorViewMatrix * reflectMatrix * czm_model;
      modelView[3][0] = 0.0;
      modelView[3][1] = 0.0;
      modelView[3][2] = 0.0;
      v_uv = reflectorProjectionMatrix * modelView * p;
      vec4 positionMC = vec4( position3DHigh + position3DLow, 1.0 );
      v_worldPosition = czm_model * positionMC;

      gl_Position = czm_modelViewProjectionRelativeToEye * p;
    }
  `

  function createPlaceHolderTexture(_0x4315a9) {
    const Texture = new Cesium['Texture']({
      'context': _0x4315a9,
      'source': {
        'width': 1,
        'height': 1,
        'arrayBufferView': new Uint8Array([255, 0, 0, 255])
      },
      'sampler': new Cesium['Sampler']({
        'wrapS': Cesium['TextureWrap']['REPEAT'],
        'wrapT': Cesium['TextureWrap']['REPEAT'],
        'minificationFilter': Cesium['TextureMinificationFilter']['LINEAR'],
        'magnificationFilter': Cesium['TextureMinificationFilter']['LINEAR']
      })
    });

    Texture['type'] = 'sampler2D'
    return Texture;
  }
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