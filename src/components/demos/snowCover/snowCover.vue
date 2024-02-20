<script setup>
import {onMounted, ref} from "vue";
import {addWallGeojson, initViewer} from "@/utils/cesiumUtils.js";
import { Cesium3DTileset,PostProcessStage,Cartesian3 } from "cesium";
import dat from 'dat.gui'



let viewer = null
const controls =  {
  '雪覆盖': 0.8,
  '雪速度': 90,
  '雪花大小': 0.02
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
    vec3 dx = dFdx(positionEC.xyz);
    vec3 dy = dFdy(positionEC.xyz);
    vec3 nor = normalize(cross(dx,dy));

    vec4 positionWC = normalize(czm_inverseView * positionEC);
    vec3 normalWC = normalize(czm_inverseViewRotation * nor);
    float dotNumWC = dot(positionWC.xyz,normalWC);
    if(dotNumWC<=0.3){
      glColor = mix(color,vec4(1.0),alpha*0.3);
      return;
    }
    glColor = mix(color,vec4(1.0),dotNumWC*alpha);
  }`;
  const snowCoverPostProcess = new PostProcessStage({
    fragmentShader : fs,
    uniforms : {
      alpha : controls['雪覆盖']
    }
  })
  viewer.scene.postProcessStages.add(snowCoverPostProcess);

  const fsSnow = `
  uniform sampler2D colorTexture;
  in vec2 v_textureCoordinates;
  uniform float snowSpeed;
  uniform float snowSize;
  out vec4 glColor;
  float snow(vec2 uv,float scale)
  {
      float time=czm_frameNumber/10000. *snowSpeed;
      float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;
      uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;
      uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;
      p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);
      k=smoothstep(0.,k,sin(f.x+f.y)*snowSize);
      return k*w;
  }
  void main(void){
      vec2 resolution=czm_viewport.zw;
      vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
      vec3 finalColor=vec3(0);
      //float c=smoothstep(1.,0.3,clamp(uv.y*.3+.8,0.,.75));
      float c=0.;
      c+=snow(uv,30.)*.0;
      c+=snow(uv,20.)*.0;
      c+=snow(uv,15.)*.0;
      c+=snow(uv,10.);
      c+=snow(uv,8.);
      c+=snow(uv,6.);
      c+=snow(uv,5.);
      finalColor=(vec3(c));
      glColor=mix(texture(colorTexture,v_textureCoordinates),vec4(finalColor,1),.5);
      }
  `
  const snowPostProcess = new PostProcessStage({
    fragmentShader : fsSnow,
    uniforms : {
      snowSpeed : controls['雪速度'],
      snowSize:controls['雪花大小']
    }
  })
  viewer.scene.postProcessStages.add(snowPostProcess);


  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(controls, '雪覆盖', 0, 1).onChange(v=>{
    snowCoverPostProcess.uniforms.alpha = controls['雪覆盖']
  });
  gui.add(controls, '雪速度', 30, 150).onChange(v=>{
    snowPostProcess.uniforms.snowSpeed = controls['雪速度']
  });
  gui.add(controls, '雪花大小', 0, 0.03).onChange(v=>{
    snowPostProcess.uniforms.snowSize = controls['雪花大小']
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