<script setup>
import {onMounted, ref} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer = null
onMounted(async () => {
  const samCzm = new SamCesiumUtils.samCzm({Cesium: Cesium})
  samCzm.initViewer({id: 'cesiumContainer'})
  viewer = samCzm.viewer
  viewer.clock.shouldAnimate = true
  const tileset = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(354759),
  );
  // console.log(Cesium.Cartesian3.fromDegrees(120,30))
  // viewer.flyTo(tileset,{duration:1})
  const initPosition = Cesium.Cartesian3.fromDegrees(-71.06551256219049, 42.35433157165339, 120)

  const resource = await Cesium.IonResource.fromAssetId(3195351);


  const frustum = new Cesium.PerspectiveFrustum({
    fov: Cesium.Math.PI_OVER_THREE,
    aspectRatio: 4 / 3,
    near: 1.0,
    far: 100.0
  });


  const geometry = new Cesium.FrustumOutlineGeometry({
    frustum,
    origin: initPosition,
    orientation: new Cesium.Quaternion.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(0, 0, 0))
  })

  const instance = new Cesium.GeometryInstance({
    geometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('rgb(255,255,255)')),
    },
    id: "frustum",
  });
  viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: instance,
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: false,
      flat: true,
    }),
    asynchronous: false
  }));


  const canvas = viewer.canvas;
  canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
  canvas.addEventListener("click", function () {
    canvas.focus();
  });
  canvas.focus();

  const scene = viewer.scene;

  const pathPosition = new Cesium.SampledPositionProperty();
  const entityPath = viewer.entities.add({
    position: pathPosition,
    name: "path",
    path: {
      show: true,
      leadTime: 0,
      trailTime: 60,
      width: 10,
      resolution: 1,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.3,
        taperPower: 0.3,
        color: Cesium.Color.PALEGOLDENROD,
      }),
    },
  });

  const camera = viewer.camera;
  const controller = scene.screenSpaceCameraController;
  let r = 0;

  const hpRoll = new Cesium.HeadingPitchRoll();
  const hpRange = new Cesium.HeadingPitchRange();
  let speed = 0;
  let speedY = 0
  let speedZ = 0
  const deltaRadians = Cesium.Math.toRadians(3.0);

  let position = initPosition
  let speedVector = new Cesium.Cartesian3();
  let speedVectorY = new Cesium.Cartesian3();
  let speedVectorZ = new Cesium.Cartesian3();
  const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
      "north",
      "west",
  );

  // const headingSpan = document.getElementById("heading");
  // const pitchSpan = document.getElementById("pitch");
  // const rollSpan = document.getElementById("roll");
  // const speedSpan = document.getElementById("speed");
  // const fromBehind = document.getElementById("fromBehind");

  try {
    const model = await Cesium.Model.fromGltfAsync({
      url: resource,
      modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpRoll,
          Cesium.Ellipsoid.WGS84,
          fixedFrameTransform,
      ),
      minimumPixelSize: 128,
    })
    const planePrimitive = scene.primitives.add(model);

    let entity = viewer.entities.add({
      point:{
        // show:false

      },
      position:new Cesium.CallbackProperty(()=>{
        if (planePrimitive.ready) {
          return planePrimitive.boundingSphere.center
        }else{
          return initPosition
        }
      },false)
    })
    viewer.trackedEntity = entity

    planePrimitive.readyEvent.addEventListener(() => {
      // Play and loop all animations at half-speed
      // planePrimitive.activeAnimations.addAll({
      //   multiplier: 0.5,
      //   loop: Cesium.ModelAnimationLoop.REPEAT,
      // });

      // Zoom to model
      r = 2.0 * Math.max(planePrimitive.boundingSphere.radius, camera.frustum.near);
      controller.minimumZoomDistance = r * 0.5;
      const center = planePrimitive.boundingSphere.center;
      const heading = Cesium.Math.toRadians(230.0);
      const pitch = Cesium.Math.toRadians(-20.0);
      hpRange.heading = heading;
      hpRange.pitch = pitch;
      hpRange.range = r * 50.0;
      camera.lookAt(center, hpRange);
    });

    document.addEventListener("keydown", function (e) {
      switch (e.code) {
        case "ArrowDown":
          speed = Math.max(speed-=1, -10);
          // pitch up
          // hpRoll.pitch += deltaRadians;
          // if (hpRoll.pitch < Cesium.Math.PI / 8 ) {
          //   hpRoll.pitch = Cesium.Math.PI / 8;
          //   return
          // }

          break;
        case "ArrowUp":
          speed = Math.min(speed+=1, 10);
          // pitch up
          // hpRoll.pitch -= deltaRadians;
          // if (hpRoll.pitch > -Cesium.Math.PI / 8 ) {
          //   hpRoll.pitch = -Cesium.Math.PI / 8;
          // }
          break;
        case "ArrowLeft":
          // speed = Math.min(speed+=1, 10);
          // pitch up
          hpRoll.roll += deltaRadians;
          if (hpRoll.roll > Cesium.Math.TWO_PI) {
            hpRoll.roll -= Cesium.Math.TWO_PI;
          }
          break;
        case "ArrowRight":
          // speed = Math.min(speed+=1, 10);
          // pitch up
          hpRoll.heading += deltaRadians;
          if (hpRoll.heading > Cesium.Math.TWO_PI) {
            hpRoll.heading -= Cesium.Math.TWO_PI;
          }
          break;
        case "KeyA":
          speedY = Math.min(speedY+=1, 10);
          break;
        case "KeyD":
          speedY = Math.max(speedY-=1, -10);
          break;
        case "KeyW":
          speedZ = Math.min(speedZ+=1, 10);
          break;
        case "KeyS":
          speedZ = Math.max(speedZ-=1, -10);
          break;
        default:
      }
    });


    viewer.scene.preUpdate.addEventListener(function (scene, time) {
      speedVector = Cesium.Cartesian3.multiplyByScalar(
          Cesium.Cartesian3.UNIT_X,
          speed / 10,
          speedVector,
      );
      speedVectorY = Cesium.Cartesian3.multiplyByScalar(
          Cesium.Cartesian3.UNIT_Y,
          speedY / 10,
          speedVectorY,
      );
      speedVectorZ = Cesium.Cartesian3.multiplyByScalar(
          Cesium.Cartesian3.UNIT_Z,
          speedZ / 10,
          speedVectorZ,
      );
      Cesium.Cartesian3.add(speedVector,speedVectorY,speedVector)
      Cesium.Cartesian3.add(speedVector,speedVectorZ,speedVector)
      position = Cesium.Matrix4.multiplyByPoint(
          planePrimitive.modelMatrix,
          speedVector,
          position,
      );
      pathPosition.addSample(Cesium.JulianDate.now(), position);
      Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpRoll,
          Cesium.Ellipsoid.WGS84,
          fixedFrameTransform,
          planePrimitive.modelMatrix,
      );

      if (planePrimitive.ready) {
      // Zoom to model
      //   const transform = Cesium.Transforms.eastNorthUpToFixedFrame(planePrimitive.boundingSphere.center)
      //   viewer.scene.camera.lookAtTransform(transform,new Cesium.HeadingPitchRange(0,-Math.PI / 8,2900))
      // const center = planePrimitive.boundingSphere.center;
      // hpRange.heading = hpRoll.heading;
      // hpRange.pitch = hpRoll.pitch;
      // camera.lookAt(center, hpRange);
        // 创建一个entity来间接的跟踪
      }
    });


  } catch (error) {
    console.log(`Error loading model: ${error}`);
  }

  viewer.scene.preRender.addEventListener(function (scene, time) {
    // headingSpan.innerHTML = Cesium.Math.toDegrees(hpRoll.heading).toFixed(1);
    // pitchSpan.innerHTML = Cesium.Math.toDegrees(hpRoll.pitch).toFixed(1);
    // rollSpan.innerHTML = Cesium.Math.toDegrees(hpRoll.roll).toFixed(1);
    // speedSpan.innerHTML = speed.toFixed(1);
  });


})

</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="remote-control">
      <img src="@/assets/imgs/djiRemoteControl.png" alt="">
    </div>
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

.remote-control {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
