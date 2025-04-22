<script setup>
import {onMounted, ref} from "vue";
import SamCesiumUtils from "sam-czm-utils";
import * as Cesium from "cesium";

let viewer = null
let fbo,frustum

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

  const hpRoll = new Cesium.HeadingPitchRoll();
  const hpRollFrustum = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0),Cesium.Math.toRadians(90),0);
  const hpRange = new Cesium.HeadingPitchRange();
  fbo = createFrameBuffer(viewer.scene.context)

  frustum = new Cesium.PerspectiveFrustum({
    fov: Cesium.Math.PI_OVER_THREE,
    aspectRatio: 3/4,
    near: 1.0,
    far: 100.0
  });


  const geometry = new Cesium.FrustumOutlineGeometry({
    frustum,
    origin: new Cesium.Cartesian3(),
    orientation: new Cesium.Quaternion.fromHeadingPitchRoll(hpRollFrustum)
  })

  const instance = new Cesium.GeometryInstance({
    geometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('rgb(255,255,255)')),
    },
    id: "frustum",
  });
  const frustumPrimitive =  viewer.scene.primitives.add(new Cesium.Primitive({
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



  let speed = 0;
  let speedY = 0
  let speedZ = 0
  const deltaRadians = Cesium.Math.toRadians(3.0);

  let position = Cesium.Cartesian3.clone(initPosition)
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
          break;
        case "ArrowUp":
          speed = Math.min(speed+=1, 10);
          break;
        case "ArrowLeft":
          // speed = Math.min(speed+=1, 10);
          // pitch up
          hpRoll.heading -= deltaRadians;
          if (hpRoll.heading < -Cesium.Math.TWO_PI) {
            hpRoll.heading += Cesium.Math.TWO_PI;
          }
          hpRollFrustum.heading -= deltaRadians;
          if (hpRollFrustum.heading < -Cesium.Math.TWO_PI) {
            hpRollFrustum.heading += Cesium.Math.TWO_PI;
          }
          break;
        case "ArrowRight":
          // speed = Math.min(speed+=1, 10);
          // pitch up
          hpRoll.heading += deltaRadians;
          if (hpRoll.heading > Cesium.Math.TWO_PI) {
            hpRoll.heading -= Cesium.Math.TWO_PI;
          }
          hpRollFrustum.heading += deltaRadians;
          if (hpRollFrustum.heading > Cesium.Math.TWO_PI) {
            hpRollFrustum.heading -= Cesium.Math.TWO_PI;
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
        case "KeyQ":
          // 视锥体抬升
          hpRollFrustum.pitch += deltaRadians;
          if (hpRollFrustum.pitch > Cesium.Math.TWO_PI) {
            hpRollFrustum.pitch -= Cesium.Math.TWO_PI;
          }
          console.log(hpRollFrustum.pitch)
          break;
        case "KeyE":
          // 视锥体下降
          hpRollFrustum.pitch -= deltaRadians;
          if (hpRollFrustum.pitch < -Cesium.Math.TWO_PI) {
            hpRollFrustum.pitch += Cesium.Math.TWO_PI;
          }
          console.log(hpRollFrustum.pitch)
          break;
        default:
      }
    });
    document.addEventListener("keyup", function (e) {
      switch (e.code) {
        case "ArrowDown":
          speed = 0;
          break;
        case "ArrowUp":
          // 让速度在2s内减到0
          speed = 0
          break;

        case "KeyA":
          speedY = 0;
          break;
        case "KeyD":
          speedY = 0;
          break;
        case "KeyW":
          speedZ = 0;
          break;
        case "KeyS":
          speedZ = 0;
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
      // 更新视锥体位置
      // frustumPrimitive.modelMatrix = Cesium.Matrix4.fromTranslationQuaternionRotationScale(
      //     Cesium.Cartesian3.subtract(position,initPosition,new Cesium.Cartesian3()),
      //     Cesium.Quaternion.fromHeadingPitchRoll(hpRollFrustum),
      //     new Cesium.Cartesian3(1.0, 1.0, 1.0),
      //     new Cesium.Matrix4());
      // 更新视锥体朝向

      Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpRollFrustum,
          Cesium.Ellipsoid.WGS84,
          fixedFrameTransform,
          frustumPrimitive.modelMatrix,
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

      }

      let camera = new Cesium.Camera(viewer.scene);
      camera.setView({
        destination: position,
        orientation: {
          heading:hpRollFrustum.heading + Cesium.Math.toRadians(180),
          pitch: -hpRollFrustum.pitch,
          roll:hpRollFrustum.roll + Cesium.Math.toRadians(180)
        }
      })
      camera.frustum = new Cesium.PerspectiveFrustum({
        fov: Cesium.Math.PI_OVER_THREE,
        aspectRatio: 1,
        near: 10.0,
        far: 3000.0
      });
      renderToFbo(fbo, viewer.scene, camera)
      let texture = Cesium.Texture.fromFramebuffer({
        context: viewer.scene.context,
        framebuffer: fbo
      })
      texture.type = 'sampler2D';

      let width = viewer.scene.context.drawingBufferWidth;
      let height = viewer.scene.context.drawingBufferHeight;
      let pixels = viewer.scene.context.readPixels({
        x: 0,
        y: 0,
        width: width,
        height: height,
        framebuffer: fbo,
      });
      let cavs = document.getElementById("fboContent");
      cavs.width = width;
      cavs.height = height;
      let imgData = new ImageData(new Uint8ClampedArray(pixels), width, height);
      let ctx = cavs.getContext("2d");
      ctx.putImageData(imgData, 0, 0, 0, 0, width, height);
      ctx.translate(0, height);
      ctx.scale(1, -1);
      ctx.drawImage(cavs, 0, 0);
      // cavs.style.height = (height * 0.3) + "px";
      cavs.style.height = "276px";
      // cavs.style.width = (width * 0.3) + "px";
      cavs.style.width = "503px";
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

  drawUI()


})


function createFrameBuffer(context) {
  let width = context.drawingBufferWidth;
  let height = context.drawingBufferHeight;
  let framebuffer = new Cesium.Framebuffer({
    context: context,
    colorTextures: [
      new Cesium.Texture({
        context: context,
        width: width,
        height: height,
        pixelFormat: Cesium.PixelFormat.RGBA,
      }),
    ]
  });
  return framebuffer;
}

function drawUI() {
  // 获取Canvas元素和上下文
  const canvas = document.getElementById('remoteUI');
  const ctx = canvas.getContext('2d');

  // 绘制九宫格均分线
  function drawGridLines() {
    // 设置线条样式
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.5;

    // 计算格子大小
    const gridSizeWidth = canvas.width / 3;
    const gridSizeHeight = canvas.height / 3;

    // 绘制水平线
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridSizeHeight);
      ctx.lineTo(canvas.width, i * gridSizeHeight);
      ctx.stroke();
    }

    // 绘制垂直线
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSizeWidth, 0);
      ctx.lineTo(i * gridSizeWidth, canvas.height);
      ctx.stroke();
    }
  }

  // 绘制对角线
  function drawDiagonals() {
    // 设置线条样式
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;

    // 绘制从左上到右下的对角线
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    // 绘制从右上到左下的对角线
    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
  }

  // 执行绘制
  drawGridLines();
  drawDiagonals();
}

function renderToFbo(fbo, scene,cameraFbo) {
  let camera = scene._defaultView.camera
  scene._defaultView.camera = cameraFbo

  const frameState = scene._frameState;
  const context = scene.context;
  const us = context.uniformState;

  const view = scene._defaultView;
  scene._view = view;

  scene.updateFrameState();
  frameState.passes.render = true;
  frameState.passes.postProcess = scene.postProcessStages.hasSelected;
  const renderTilesetPassState = new Cesium.Cesium3DTilePassState({
    pass: Cesium.Cesium3DTilePass.RENDER,
  });
  frameState.tilesetPassState = renderTilesetPassState;

  let backgroundColor = Cesium.defaultValue(scene.backgroundColor, Cesium.Color.BLACK);

  frameState.backgroundColor = backgroundColor;

  // frameState.atmosphere = scene.atmosphere;
  // scene.fog.update(frameState);

  us.update(frameState);

  // const shadowMap = scene.shadowMap;
  // if (Cesium.defined(shadowMap) && shadowMap.enabled) {
  //   if (!Cesium.defined(scene.light) || scene.light instanceof SunLight) {
  //     // Negate the sun direction so that it is from the Sun, not to the Sun
  //     Cesium.Cartesian3.negate(us.sunDirectionWC, scene._shadowMapCamera.direction);
  //   } else {
  //     Cesium.Cartesian3.clone(scene.light.direction, scene._shadowMapCamera.direction);
  //   }
  //   frameState.shadowMaps.push(shadowMap);
  // }

  scene._computeCommandList.length = 0;
  scene._overlayCommandList.length = 0;

  const viewport = view.viewport;
  viewport.x = 0;
  viewport.y = 0;
  viewport.width = context.drawingBufferWidth;
  viewport.height = context.drawingBufferHeight;

  const passState = view.passState;
  // 将fbo赋值到passState.framebuffer中
  passState.framebuffer = fbo;
  passState.blendingEnabled = undefined;
  passState.scissorTest = undefined;
  passState.viewport = Cesium.BoundingRectangle.clone(viewport, passState.viewport);

  if (Cesium.defined(scene.globe)) {
    scene.globe.beginFrame(frameState);
  }

  scene.updateEnvironment();
  scene.updateAndExecuteCommands(passState, backgroundColor);
  scene.resolveFramebuffers(passState);

  passState.framebuffer = undefined;
  //executeOverlayCommands(scene, passState);

  if (Cesium.defined(scene.globe)) {
    scene.globe.endFrame(frameState);
    if (!scene.globe.tilesLoaded) {
      scene._renderRequested = true;
    }
  }

  context.endFrame();
  scene.globe.show=true;
  scene._defaultView.camera = camera

}







</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="remote-control">
      <img src="@/assets/imgs/djiRemoteControl.png" alt="" width="631">
      <canvas class="fbo-content remote-ui" id="fboContent"></canvas>
      <canvas class="remote-ui" id="remoteUI"></canvas>
      <div class="tip">WASD控制上下和左右，上下左右控制前进和转向，QE控制无人机相机视角</div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.container {
  width: 100%;
  position: relative;
}



.remote-control {
  position: absolute;
  right: 0;
  bottom: 0;
}
.remote-ui{
  position: absolute;
  right: 64px;
  bottom: 20px;
  width: 503px;
  height: 276px;
  border: 1px solid white;
}
.tip{
 position: absolute;
  right: 50px;
  bottom: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.42);
  padding: 4px;
  font-size: 16px;
  text-align: center;
}
</style>
