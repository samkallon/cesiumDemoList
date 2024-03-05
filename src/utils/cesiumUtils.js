import * as Cesium from "cesium";
import {ElMessage} from "element-plus";
import {getAssetsFile} from "@/utils/utils.js";
import * as turf from '@turf/turf'
import {Appearance} from "cesium";

export function initViewer(id) {
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
    window.viewer = viewer

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

export default class Draw {
    constructor(viewer) {
        this.viewer = viewer
        this.polygonPoints = []
        this.activePolygonPoints = []
        this.activePolygonEntity = null
        this.dynamicCallbackPoint = null
    }

    startDraw(type){
        ElMessage.info('左键点击开始绘制,右击结束')
        if (type === 'polygon'){
            this.drawPolygon()
        }
    }
    drawPolygon(){
        this.polygonPoints = []
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
        handler.setInputAction(movement=>{
            const position = this.viewer.scene.pickPosition(movement.position)
            this.viewer.entities.add({
                name:'tempPoint',
                position,
                point:{
                    pixelSize:10,
                    color:Cesium.Color.fromCssColorString('rgb(255,255,255)'),
                    disableDepthTestDistance:Number.POSITIVE_INFINITY
                }
            })
            this.polygonPoints.push(position)
            if (this.activePolygonPoints.length === 0){
                this.activePolygonPoints.push(position)
                this.dynamicCallbackPoint = new Cesium.CallbackProperty(function () {
                    return new Cesium.PolygonHierarchy(this.activePolygonPoints);
                }, false)
                this.activePolygonEntity = this.viewer.entities.add({
                    name:'tempPolygon',
                    polygon:{
                        hierarchy:this.dynamicCallbackPoint,
                        material:Cesium.Color.fromCssColorString('rgba(255,255,255,0.49)')
                    }
                })
            }
            this.activePolygonPoints.push(position)
        },Cesium.ScreenSpaceEventType.LEFT_CLICK)

        handler.setInputAction(movement=>{
            const tempPosition = this.viewer.scene.pickPosition(movement.endPosition)
            // 添加临时面
            if (tempPosition && this.activePolygonPoints.length !== 0){
                this.activePolygonPoints.pop();
                this.activePolygonPoints.push(tempPosition);
                console.log(this.activePolygonPoints[this.activePolygonPoints.length -1].x)

            }
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE)

        handler.setInputAction(movement=>{
            if (this.polygonPoints.length > 2){
                this.viewer.entities.add({
                    name:'drawPolygon',
                    polygon:{
                        hierarchy:this.polygonPoints,
                        material:Cesium.Color.fromCssColorString('rgba(255,255,255,0.49)')
                    }
                })
                removaEntitiesAndPrimitivesByName('tempPolygon',this.viewer)
                console.log(this.polygonPoints)
                this.activePolygonPoints = []
                this.polygonPoints = []
                this.dynamicCallbackPoint = null
                handler.destroy()
            }else{
                ElMessage.info('点数量不足3,无法构成面')
            }
        },Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }
    clear(){
        removaEntitiesAndPrimitivesByName('drawPolygon',this.viewer)
        removaEntitiesAndPrimitivesByName('tempPoint',this.viewer)
    }
    
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
        geometryInstances.push(new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
                positions: linePositions,
                width: 3,
                vertexFormat : Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
            })
        }))
    })
    viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances,
            appearance: new Cesium.PolylineMaterialAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: 'upLine',
                        uniforms: {
                            color: new Cesium.Color.fromCssColorString('#fe01fa'),
                            speed: 6,
                            percent: 0.1, //线的拖尾长度
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
        }
    ))
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
        let lon = position[0] + Math.random() * 0.04 * (i % 2 == 0 ? 1 : -1);
        let lat = position[1] + Math.random() * 0.04 * (i % 2 == 0 ? 1 : -1);
        list.push([lon, lat])
    }
    return list
}

