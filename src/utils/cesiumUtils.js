import * as Cesium from "cesium";
import {ElMessage} from "element-plus";
import {TileMapServiceImageryProvider} from "cesium";

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
    })
    Cesium.IonImageryProvider.fromAssetId(2).then(res=>{
        viewer.imageryLayers.addImageryProvider(res);
    })

    viewer.scene.globe.depthTestAgainstTerrain = true
    viewer._cesiumWidget._creditContainer.style.display = 'none' //隐藏版权信息
    return viewer
}

export default class Draw {
    constructor(viewer) {
        this.viewer = viewer
        this.polygonPoints = []
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
        },Cesium.ScreenSpaceEventType.LEFT_CLICK)

        handler.setInputAction(movement=>{

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