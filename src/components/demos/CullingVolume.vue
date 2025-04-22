<script setup>
// 和相机视锥体相交的entity, 检测,并调整高度
import {onMounted} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";
import gsap from 'gsap'

let viewer = null
let center = [118.79304711609575, 32.07511800768333]
onMounted(async () => {
  let viewer = null
  const samCzm = new SamCesiumUtils.samCzm({Cesium: Cesium})
  samCzm.initViewer({id: 'cesiumContainer', initCamera: false})
  viewer = samCzm.viewer
  viewer.scene.camera.setView({
    destination:{
      "x": -2602534.3731673695,
      "y": 4748474.4911166215,
      "z": 3359885.819393283
    },
    orientation:{
      heading:6.267433204163893,
      pitch:-0.7163185798239007
    }
  })

  const dataSource = await Cesium.GeoJsonDataSource.load('/cesiumDemoList/geojson/nanJinJianYeBuildings.json');
  viewer.dataSources.add(dataSource)
  dataSource.entities.values.forEach(e=>{
    e._polygon.height._value = 2
  })

  viewer.camera.changed.addEventListener(()=>{
    intersectEntityAndModifyHeight()
  })

  function intersectEntityAndModifyHeight() {
    const frustum = viewer.camera.frustum
    const cullingVolume = frustum.computeCullingVolume(viewer.camera.position, viewer.camera.direction, viewer.camera.up);
    dataSource.entities.values.forEach(e=>{
      const sphere = new Cesium.BoundingSphere()
      viewer._dataSourceDisplay.getBoundingSphere(e,false,sphere)
      const intersect = cullingVolume.computeVisibility(sphere);
      let obj = {
        heightAdd:0,
        heightMin:100
      }
      if (intersect !== -1){
        if (e._polygon.extrudedHeight && e._polygon.extrudedHeight.getValue() > 0){
        }else{
          gsap.to(obj,{
            heightAdd:100,
            duration: 1,
            ease: "power3.inOut",})
          e._polygon.extrudedHeight = new Cesium.CallbackProperty((time,result)=>{
            return obj.heightAdd
          },false)
        }

      }else{
        if (e._polygon.extrudedHeight && e._polygon.extrudedHeight.getValue() > 0){
          gsap.to(obj,{
            heightMin:0,
            duration: 1,
            ease: "power3.inOut",})
          e._polygon.extrudedHeight = new Cesium.CallbackProperty((time,result)=>{
            return obj.heightMin
          },false)
        }
      }

    })

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

.dig-terrian-container {
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
}


</style>
