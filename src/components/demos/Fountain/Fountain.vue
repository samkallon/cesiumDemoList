<script setup>
import * as Cesium from 'cesium'
import {onMounted} from "vue";
import smoke from './smoke.png?url'
import dat from "dat.gui";
import SamCesiumUtils from "sam-czm-utils";
let viewer = null
onMounted(async()=>{
  const samCzm = new SamCesiumUtils.samCzm({Cesium: Cesium})
  samCzm.initViewer({id: 'cesiumContainer', initCamera: false, viewerOptions: {timeline: true, animation: true}})
  viewer = samCzm.viewer
// try!
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.camera.setView({
    destination:{
      "x": -2606096.19197039,
      "y": 4741283.044767857,
      "z": 3366846.300314784
    },
    orientation:{
      heading:6.030628225197559,
      pitch:-0.32690567198428333,
      roll:6.283185016029345
    }
  })

  //Set the random number seed for consistent results.
  Cesium.Math.setRandomNumberSeed(3);

//Set bounds of our simulation time
  const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
  const stop = Cesium.JulianDate.addSeconds(
      start,
      120,
      new Cesium.JulianDate()
  );

//Make sure viewer is at the desired time.
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
  viewer.clock.multiplier = 1;
  viewer.clock.shouldAnimate = true;

//Set timeline to simulation bounds
//   viewer.timeline.zoomTo(start, stop);

  const viewModel = {
    emissionRate: 485,
    gravity: -43,
    minimumSpeed: 70,
    maximumSpeed: 90,
    startScale: 1.0,
    endScale: 30.0,
    particleSize: 6.0,
  };

  function computeModelMatrix(entity, time) {
    return entity.computeModelMatrix(time, new Cesium.Matrix4());
  }

  const emitterModelMatrix = new Cesium.Matrix4();
  const translation = new Cesium.Cartesian3();
  const rotation = new Cesium.Quaternion();
  let hpr = new Cesium.HeadingPitchRoll();
  const trs = new Cesium.TranslationRotationScale();

  function computeEmitterModelMatrix() {
    hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, Cesium.Math.toRadians(90), 0.0, hpr);
    trs.translation = Cesium.Cartesian3.fromElements(
        -4.0,
        0.0,
        1.4,
        translation
    );
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

    return Cesium.Matrix4.fromTranslationRotationScale(
        trs,
        emitterModelMatrix
    );
  }

  const scene = viewer.scene;

  const particleSystem = scene.primitives.add(
      new Cesium.ParticleSystem({
        image: smoke,

        startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
        endColor: Cesium.Color.WHITE.withAlpha(0.0),

        startScale: viewModel.startScale,
        endScale: viewModel.endScale,

        // minimumParticleLife: viewModel.minimumParticleLife,
        // maximumParticleLife: viewModel.maximumParticleLife,

        minimumSpeed: viewModel.minimumSpeed,
        maximumSpeed: viewModel.maximumSpeed,

        imageSize: new Cesium.Cartesian2(
            viewModel.particleSize,
            viewModel.particleSize
        ),

        emissionRate: viewModel.emissionRate,

        lifetime: 0.2,
        sizelnMeters:false,

        // emitter: new Cesium.CircleEmitter(2.0),
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),// 锥形发射器

        emitterModelMatrix: computeEmitterModelMatrix(),

        updateCallback: applyGravity,
      })
  );

  const gravityScratch = new Cesium.Cartesian3();

  function applyGravity(p, dt) {
    // We need to compute a local up vector for each particle in geocentric space.
    const position = p.position;

    Cesium.Cartesian3.normalize(position, gravityScratch);
    Cesium.Cartesian3.multiplyByScalar(
        gravityScratch,
        viewModel.gravity * dt,
        gravityScratch
    );

    p.velocity = Cesium.Cartesian3.add(
        p.velocity,
        gravityScratch,
        p.velocity
    );
  }

  viewer.scene.preUpdate.addEventListener(function (scene, time) {
    particleSystem.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame({
      "x": -2605733.9141162727,
      "y": 4740914.227929786,
      "z": 3367209.4464677833
    });

    // Account for any changes to the emitter model matrix.
    particleSystem.emitterModelMatrix = computeEmitterModelMatrix();

    // // Spin the emitter if enabled.
    // if (viewModel.spin) {
    //   viewModel.heading += 1.0;
    //   viewModel.pitch += 1.0;
    //   viewModel.roll += 1.0;
    // }
  });

  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:10px;left:10px;'
  document.querySelector('.container').appendChild(gui.domElement)
  gui.add(viewModel, 'emissionRate', 0, 2000).onChange(newValue=>{
    particleSystem.emissionRate = parseFloat(newValue);
  });
  gui.add(viewModel, 'particleSize', 0, 60).onChange(newValue=>{
    const particleSize = parseFloat(newValue);
    particleSystem.minimumImageSize.x = particleSize;
    particleSystem.minimumImageSize.y = particleSize;
    particleSystem.maximumImageSize.x = particleSize;
    particleSystem.maximumImageSize.y = particleSize;
  });
  gui.add(viewModel, 'gravity', -100, 100).onChange(newValue=>{});
  gui.add(viewModel, 'minimumSpeed', 0, 300).onChange(newValue=>{
    particleSystem.minimumSpeed = parseFloat(newValue);
  });
  gui.add(viewModel, 'maximumSpeed', 0, 300).onChange(newValue=>{
    particleSystem.maximumSpeed = parseFloat(newValue);
  });
  // gui.add(viewModel, 'minimumParticleLife', 0, 20).onChange(newValue=>{
  //   particleSystem.minimumParticleLife = parseFloat(newValue);
  // });
  // gui.add(viewModel, 'maximumParticleLife', 0, 20).onChange(newValue=>{
  //   particleSystem.maximumParticleLife = parseFloat(newValue);
  // });
  gui.add(viewModel, 'startScale', 0, 10).onChange(newValue=>{
    particleSystem.startScale = parseFloat(newValue);
  });
  gui.add(viewModel, 'endScale', 0, 50).onChange(newValue=>{
    particleSystem.endScale = parseFloat(newValue);
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