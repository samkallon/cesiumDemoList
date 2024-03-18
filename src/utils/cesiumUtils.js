import * as Cesium from "cesium";
import {ElMessage} from "element-plus";
import {getAssetsFile} from "@/utils/utils.js";
import * as turf from '@turf/turf'
import {Appearance, HeadingPitchRoll, Math as CzmMath} from "cesium";

export function initViewer(id,initCamera) {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMzM3OGE5Yi1lYjc5LTRhNzQtYWFjMC04M2M2MTY3YjFjM2YiLCJpZCI6NDEzMTIsImlhdCI6MTcwMzIwODY4MH0.Hda2inmYARoq6khHSp68tXlk0vPNfNEsenzYLFVLk_k'
    const viewer = new Cesium.Viewer(id, {
        infoBox: false,
        fullscreenButton: false,
        homeButton: false, //是否显示Home按钮
        sceneModePicker: false, //是否显示3D/2D选择器
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        animation: false, //是否创建动画小器件，左下角仪表
        timeline: false, //是否显示时间轴
        fullscreenButtion: false, //是否显示全屏按钮
        vrButton: false,
        selectionIndicator: false, //是否显示选取指示器组件
        baseLayerPicker: false,
        baseLayer:false,
        scene3DOnly:true
    })

    Cesium.IonImageryProvider.fromAssetId(2).then(res=>{
        viewer.imageryLayers.addImageryProvider(res);
    })

    viewer.scene.globe.depthTestAgainstTerrain = true
    viewer._cesiumWidget._creditContainer.style.display = 'none' //隐藏版权信息
    viewer.resolutionScale = 1.0
    // window.viewer = viewer
    if (initCamera){
        viewer.scene.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(118.79304711609575, 32.07511800768333), 3000),
            {
                offset: new HeadingPitchRoll(0, CzmMath.toRadians(-30), 0),
                duration: 1
            }
        )
    }
    window.pickPointList = []
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    handler.setInputAction(mv=>{
        const position = viewer.scene.pickPosition(mv.position)
        console.log('Cartesian3: %o',position)
        const cartogra = Cesium.Cartographic.fromCartesian(position)
        console.log('Cartographic: %o',{
            lat:Cesium.Math.toDegrees(cartogra.latitude),
            lng:Cesium.Math.toDegrees(cartogra.longitude),
            height:cartogra.height
        })
        window.pickPointList.push(position)
        // viewer.entities.add({
        //     name:'pickPoint',
        //     position,
        //     point:{
        //         disableDepthTestDistance:Number.POSITIVE_INFINITY,
        //         pixelSize:18
        //     }
        // })
    },Cesium.ScreenSpaceEventType.LEFT_CLICK)
    handler.setInputAction(mv=>{
        window.pickPointList = []
        // removaEntitiesAndPrimitivesByName('pickPoint',viewer)
    },Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    return viewer
}




export function removaEntitiesAndPrimitivesByName(name,viewer) {
    const entities = getEntitiesByName(name,viewer)
    entities.forEach(e => {
        viewer.entities.remove(e)
    })
    const primitives = viewer.scene.primitives._primitives.filter(e => e.name === name)
    primitives.forEach(e => {
        viewer.scene.primitives.remove(e)
    })
}

export function getEntitiesByName(name,viewer) {
    const entityList = viewer.entities._entities._array
    return entityList.filter(e => e.name === name)
}

export function addWallGeojson(
    {
        wallList,
        maximumHeights,
        minimumHeights,
        viewer,
        imgUrl,
        dynamicDir,
        repeat
    }
) {
    const geometryInstances = wallList.map((positions) => {
        positions.push(positions[0])
        return new Cesium.GeometryInstance({
            geometry: new Cesium.WallGeometry({
                positions: positions,
                maximumHeights: positions.map(() => maximumHeights),
                minimumHeights: positions.map(() => minimumHeights),
                vertexFormat: Cesium.MaterialAppearance.VERTEX_FORMAT,
            }),
        })
    })
    const wallPrimitive = new Cesium.Primitive({
        geometryInstances,
        appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: 'DynamicWall' + dynamicDir,
                    uniforms: {
                        image: getAssetsFile(imgUrl || 'imgs/materialImg/GradientRed.png'),
                        color: Cesium.Color.fromCssColorString('#3a5e88'),
                        repeat: repeat || new Cesium.Cartesian2(4.0, 1.0),
                        speed: 1,
                    },
                    source: `
              czm_material czm_getMaterial(czm_materialInput materialInput) {
                  czm_material material = czm_getDefaultMaterial(materialInput);
                  vec2 st = materialInput.st * repeat;
                  ${dynamicDir == 'chuiZhi'?'vec4 colorImage = texture(image, vec2((1. - fract(st.t - speed * czm_frameNumber * 0.005)), st.t));':'vec4 colorImage = texture(image, vec2((1. - fract(st.s - speed * czm_frameNumber * 0.005)), st.t));'}
                  vec4 fragColor;
                  fragColor.rgb = color.rgb / 1.0;
                  fragColor = czm_gammaCorrect(fragColor); // 伽马校正
                  material.alpha = colorImage.a * color.a  * 1.4;
                  material.diffuse = color.rgb;
                  material.emission = fragColor.rgb;
                  return material;
              }
          `,
                }
            }),
        }),
    })
    wallPrimitive.name = 'DynamicWall'
    viewer.scene.primitives.add(wallPrimitive)
}

export function getBoundingSphereFromCartesian3List(Cartesian3List) {
    const latLngList = Cartesian3List.map(e => [getLatlngFromCartesian3(e).lng, getLatlngFromCartesian3(e).lat])
    const bbox = turf.bbox(
        turf.featureCollection(latLngList.map(e => {
            return turf.point([e[0], e[1]])
        })))
    // 计算两点距离
    const from = turf.point([bbox[0], bbox[1]]);
    const to = turf.point([bbox[2], bbox[3]]);
    const distance = turf.distance(from, to, {units: 'kilometers'});
    // 计算中心点
    const center = turf.midpoint(from, to);
    return new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(
        center.geometry.coordinates[0],center.geometry.coordinates[1]
    ),distance*1000/2)
}

export function getLatlngFromCartesian3(cartesian3Point) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian3Point)
    return {
        lat:Cesium.Math.toDegrees(cartographic.latitude),
        lng:Cesium.Math.toDegrees(cartographic.longitude),
        height:cartographic.height,
    }
}



/**
 * @description: 竖直随机飞线初始化
 * @param {*} _viewer
 * @param {*} _center ：中心点
 * @param {*} _num ：数量
 * @return {*}
 */
export function lineFlowInit(viewer, _center, _num) {
    let _positions = generateRandomPosition(_center, _num);
    let geometryInstances = []
    _positions.forEach(item => {
        // 经纬度
        let start_lon = item[0];
        let start_lat = item[1];

        let startPoint = new Cesium.Cartesian3.fromDegrees(start_lon, start_lat, 0);

        // 随机高度
        let height = 5000 * Math.random();
        let endPoint = new Cesium.Cartesian3.fromDegrees(start_lon, start_lat, height);
        let linePositions = [];
        linePositions.push(startPoint);
        linePositions.push(endPoint);
        geometryInstances = new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
                positions: linePositions,
                width: 3,
                vertexFormat : Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
            })
        })
        viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances,
            appearance: new Cesium.PolylineMaterialAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: 'upLine',
                        uniforms: {
                            color: new Cesium.Color.fromCssColorString('#fe01fa'),
                            speed: 6 * Math.random(),
                            percent: 0.2, //线的拖尾长度
                            gradient: 0.01
                        },
                        source: `
                          czm_material czm_getMaterial(czm_materialInput materialInput){
                              czm_material material = czm_getDefaultMaterial(materialInput);
                              vec2 st = materialInput.st;
                              float t =fract(czm_frameNumber * speed / 1000.0);
                              t *= (1.0 + percent);
                              float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
                              alpha += gradient;
                              material.diffuse = color.rgb;
                              material.alpha = alpha;
                              return material;
                            }`,
                    }
                }),
            })
        }))
    })

}

/**
 * @description: 产生随机点
 * @param {*} position：中心点坐标
 * @param {*} num：随机点数量
 * @return {*}
 */
function generateRandomPosition(position, num) {
    let list = []
    for (let i = 0; i < num; i++) {
        // random产生的随机数范围是0-1，需要加上正负模拟
        let lon = position[0] + Math.random() * 0.07 * (Math.random() > 0.5 ? 1 : -1);
        let lat = position[1] + Math.random() * 0.07 * (Math.random() > 0.5? 1 : -1);
        list.push([lon, lat])
    }
    return list
}


/**
 *
 * @param viewer
 * @param position  Cartesian3
 * @param radii Cartesian3 椭球体的三轴长度
 * @param color
 * @param speed
 */
export function lightenEillposid({viewer, position, radii, color, speed}) {
    const transFormMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position)
    const source = new Cesium.Cartesian3(0.0, 0.0, 0.0)
    const ellipsoid = new Cesium.EllipsoidGeometry({
        radii,
        vertexFormat:Cesium.VertexFormat.POSITION_AND_ST,
    })
    const geometry = Cesium.EllipsoidGeometry.createGeometry(ellipsoid);
    viewer.scene.primitives.add(new Cesium.Primitive({
        asynchronous: false,
        geometryInstances:new Cesium.GeometryInstance({
            geometry,
            modelMatrix:Cesium.Matrix4.multiplyByTranslation(transFormMatrix,source,new Cesium.Matrix4()),
            id:'ellipsoid'
        }),
        appearance:new Cesium.EllipsoidSurfaceAppearance({
            material:new Cesium.Material({
                fabric:{
                    type:'lightenEillposid',
                    uniforms:{
                        color,speed
                    },
                    source:`
                        uniform vec4 color;
                        uniform float speed;

                        #define pi 3.1415926535
                        #define PI2RAD 0.01745329252
                        #define TWO_PI (2. * PI)

                        float rands(float p){
                        return fract(sin(p) * 10000.0);
                        }

                        float noise(vec2 p){
                        float time = fract( czm_frameNumber * speed / 1000.0);
                        float t = time / 20000.0;
                        if(t > 1.0) t -= floor(t);
                        return rands(p.x * 14. + p.y * sin(t) * 0.5);
                        }

                        vec2 sw(vec2 p){
                        return vec2(floor(p.x), floor(p.y));
                        }

                        vec2 se(vec2 p){
                        return vec2(ceil(p.x), floor(p.y));
                        }

                        vec2 nw(vec2 p){
                        return vec2(floor(p.x), ceil(p.y));
                        }

                        vec2 ne(vec2 p){
                        return vec2(ceil(p.x), ceil(p.y));
                        }

                        float smoothNoise(vec2 p){
                        vec2 inter = smoothstep(0.0, 1.0, fract(p));
                        float s = mix(noise(sw(p)), noise(se(p)), inter.x);
                        float n = mix(noise(nw(p)), noise(ne(p)), inter.x);
                        return mix(s, n, inter.y);
                        }

                        float fbm(vec2 p){
                        float z = 2.0;
                        float rz = 0.0;
                        vec2 bp = p;
                        for(float i = 1.0; i < 6.0; i++){
                            rz += abs((smoothNoise(p) - 0.5)* 2.0) / z;
                            z *= 2.0;
                            p *= 2.0;
                        }
                        return rz;
                        }

                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st;
                        vec2 st2 = materialInput.st;
                        float time = fract( czm_frameNumber * speed / 1000.0);
                        if (st.t < 0.5) {
                            discard;
                        }
                        st *= 4.;
                        float rz = fbm(st);
                        st /= exp(mod( time * 2.0, pi));
                        rz *= pow(15., 0.9);
                        vec4 temp = vec4(0);
                        temp = mix( color / rz, vec4(color.rgb, 0.1), 0.2);
                        if (st2.s < 0.05) {
                            temp = mix(vec4(color.rgb, 0.1), temp, st2.s / 0.05);
                        }
                        if (st2.s > 0.95){
                            temp = mix(temp, vec4(color.rgb, 0.1), (st2.s - 0.95) / 0.05);
                        }
                        material.diffuse = temp.rgb;
                        material.alpha = temp.a * 3.0;
                        return material;
                        }
                    `
                }
            })
        })
    }))

}


export function kuoSanYuan({viewer,latlng,color,radius,speed,height}) {
    const geometryInstances = new Cesium.GeometryInstance({
        geometry: new Cesium.CircleGeometry({
            center: Cesium.Cartesian3.fromDegrees(latlng[0], latlng[1],latlng[2]),
            radius: radius,
            height
        }),
    })
    const circlePrimitive = new Cesium.Primitive({
        geometryInstances,
        appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: 'KuoSanYuan',
                    uniforms: {
                        color: Cesium.Color.fromCssColorString(color),
                        speed
                    },
                    source: `
                      uniform vec4 color;
                      uniform float speed;
                      float circle(vec2 uv, float r, float blur) {
                        float d = length(uv) * 1.0; /* 2.0 */
                        float c = smoothstep(r+blur, r, d);
                        return c;
                      }
                      czm_material czm_getMaterial(czm_materialInput materialInput)
                      {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st - 0.5;
                        material.diffuse = 2.8 * color.rgb;
                        material.emission = vec3(0);
                        float t = fract(czm_frameNumber * speed / 1000.0);
                        float s = 0.3;
                        float radius1 = smoothstep(.0, s, t) * 0.5;
                        float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);
                        float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);
                        float radius2 = 0.5 + smoothstep(s, 1.0, t) * 0.5;
                        float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);
                        material.alpha = smoothstep(1.0, s, t) * (alpha1 + alpha2*0.1 + alpha3*0.1);
                        material.alpha *= color.a ;
                        return material;
                      }
                  `,
                }
            }),
        }),
    })
    viewer.scene.primitives.add(circlePrimitive)
}

export function addRadar1({viewer,latlng,color,radius,speed,height}) {
    const geometryInstances = new Cesium.GeometryInstance({
        geometry: new Cesium.CircleGeometry({
            center: Cesium.Cartesian3.fromDegrees(latlng[0], latlng[1],latlng[2]),
            radius: radius,
            height
        }),
    })
    const circlePrimitive = new Cesium.Primitive({
        geometryInstances,
        appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: 'radar1',
                    uniforms: {
                        color: Cesium.Color.fromCssColorString(color),
                        speed,
                    },
                    source: `
                      uniform vec4 color;
                      uniform float speed;
                      vec2 center = vec2(0.,0.);
                      float radius = 0.45;
                      // 旋转点
                      vec2 rotatePoint(float angle,vec2 p)
                        {
                          float s = sin(angle);
                          float c = cos(angle);
                          // rotate point
                          float xnew = p.x * c - p.y * s;
                          float ynew = p.x * s + p.y * c;
                          p.x = xnew;
                          p.y = ynew;
                          return p;
                        }
                      // 计算点到线的距离
                      float LineToPointDistance2D( vec2 b, vec2 p)
                        {
                            vec2 pa = p;
                            vec2 ba = b;
                        
                            float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
                        
                            return length( pa - ba*h );
                        }
                        
                      float angleVec(vec2 a_, vec2 b_) 
                        {
                            vec3 a = vec3(a_, 0);
                            vec3 b = vec3(b_, 0);
                             float dotProd = dot(a,b); 
                             vec3 crossprod = cross(a,b);
                             float crossprod_l = length(crossprod);
                             float lenProd = length(a)*length(b);
                             float cosa = dotProd/lenProd;
                             float sina = crossprod_l/lenProd;
                             float angle = atan(sina, cosa);

                             if(dot(vec3(0,0,1), crossprod) < 0.0) 
                                angle=90.0;
                             return (angle * (180.0 / czm_pi));
                        }
                 
                      czm_material czm_getMaterial(czm_materialInput materialInput)
                      {
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        vec2 st = materialInput.st - 0.5;
                        // st的范围是 -0.5到0.5  所以半径是 0.5
                        vec4 colorTemp = color;
                        colorTemp.a = 0.;
                        material.diffuse = vec3(0.);
                        material.emission = vec3(0);
                        float t = -czm_frameNumber * speed / 500.0;
                        // 边线宽度
                        float circleWitdh = radius * 0.02;
                        // 扫描线宽度
                        float lineWitdh = circleWitdh * 0.5;
                        // 点到圆心的距离
                        float distanceToCenter = distance(vec2(0.),st);
                        // 点到圆边的距离  去除边线的宽度
                        float disPointToCircle = abs(distanceToCenter - 0.45 - circleWitdh);
                        //画圆
                        if (disPointToCircle < circleWitdh)
                        {
                            float val = 1.0-(disPointToCircle/circleWitdh);
                            // +0.5后，黑边可以去除，提高颜色亮度
                            colorTemp *= (val + 0.5);
                            colorTemp.a = val;
                        }
                        // 旋转线
                        vec2 lineEnd =  vec2(0.,0.45); // 线终点的初始位置
                        float angle = t;
                        lineEnd = rotatePoint(angle,lineEnd);
                        // 画线
                        float distPointToLine = LineToPointDistance2D(lineEnd,st);
                        if (distPointToLine<lineWitdh)
                        { 
                            float val = 1.0-distPointToLine/lineWitdh;
                            colorTemp*=(val+0.5);
                            colorTemp.a = val;
                             
                        }
                        float angleStela = 180.0;
                        // 画动态阴影
                        //Draw Stela
                        // 计算当前st和当前扫描线的夹角
                          float angleStelaToApply = angleVec(normalize(lineEnd-center),normalize(st-center));
                          // 当前st和线夹角小于180的 赋予扫描颜色
                          if (angleStelaToApply<angleStela && distanceToCenter<radius-circleWitdh/2.0 + 0.008)
                          {
                            float factorAngle = 1.0-angleStelaToApply/angleStela;
                            float removeAngle = 0.0; // 在这180度中,从尾部去掉这些角度不上色
                            float finalFactorAngle = (factorAngle*0.5)-removeAngle;
                            colorTemp*=(finalFactorAngle + 0.5);
                            colorTemp.a = finalFactorAngle *2.;
                          }
                        material.diffuse = colorTemp.rgb;
                        material.alpha = colorTemp.a;
                        return material;
                      }
                  `,
                }
            }),
        }),
    })
    viewer.scene.primitives.add(circlePrimitive)
}