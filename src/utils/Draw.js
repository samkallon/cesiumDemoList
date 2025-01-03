import * as Cesium from "cesium";

export default class Draw {
    constructor(viewer) {
        this.viewer = viewer
        this.drawingMode = 'polygon'
        this.activeShapePoints = []
        this.activeShape = null;
        this.floatingPoint = null;
    }
    removaEntitiesAndPrimitivesByName(name) {
        const entities = this.getEntitiesByName(name)
        entities.forEach(e => {
            this.viewer.entities.remove(e)
        })
        const primitives = this.viewer.scene.primitives._primitives.filter(e => e.name === name)
        primitives.forEach(e => {
            this.viewer.scene.primitives.remove(e)
        })
    }
    getEntitiesByName(name) {
        const entityList = this.viewer.entities._entities._array
        return entityList.filter(e => e.name === name)
    }
    createPoint(worldPosition) {
        const point = this.viewer.entities.add({
            name:'drawPoint',
            position: worldPosition,
            point: {
                color: Cesium.Color.WHITE,
                pixelSize: 10,

            },
        });
        return point;
    }

    drawShape(positionData) {
        let shape;
        if (this.drawingMode === "line") {
            shape = this.viewer.entities.add({
                name:'drawLine',
                polyline: {
                    positions: positionData,
                    clampToGround: true,
                    width: 3,
                },
            });
        } else if (this.drawingMode === "polygon") {
            shape = this.viewer.entities.add({
                name:'drawPolygon',
                polygon: {
                    hierarchy: positionData,
                    material: new Cesium.ColorMaterialProperty(
                        Cesium.Color.WHITE.withAlpha(0.7)
                    ),
                },
            });
        }
        return shape;
    }

    startDraw(type){
        this.activeShapePoints = []
        if (type){
            this.drawingMode = type
        }
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
        handler.setInputAction( (event) => {
            // We use `viewer.scene.globe.pick here instead of `viewer.camera.pickEllipsoid` so that
            // we get the correct point when mousing over terrain.
            const earthPosition = this.viewer.scene.pickPosition(event.position);
            // `earthPosition` will be undefined if our mouse is not over the globe.
            if (Cesium.defined(earthPosition)) {
                if (this.activeShapePoints.length === 0) {
                    this.floatingPoint = this.createPoint(earthPosition);
                    this.activeShapePoints.push(earthPosition);
                    const dynamicPositions = new Cesium.CallbackProperty(function () {
                        if (this.drawingMode === "polygon") {
                            return new Cesium.PolygonHierarchy(this.activeShapePoints);
                        }
                        return this.activeShapePoints;
                    }, false);
                    this.activeShape = this.drawShape(dynamicPositions);
                }
                this.activeShapePoints.push(earthPosition);
                this.createPoint(earthPosition);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction( (event) =>{
            if (Cesium.defined(this.floatingPoint)) {
                const newPosition = this.viewer.scene.pickPosition(event.endPosition);
                if (Cesium.defined(newPosition)) {
                    this.floatingPoint.position.setValue(newPosition);
                    this.activeShapePoints.pop();
                    this.activeShapePoints.push(newPosition);
                    console.log(this.activeShapePoints)

                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
// Redraw the shape so it's not dynamic and remove the dynamic shape.
        handler.setInputAction( (event) => {
            this.terminateShape();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    terminateShape() {
        this.activeShapePoints.pop();
        this.drawShape(this.activeShapePoints);
        this.viewer.entities.remove(this.floatingPoint);
        this.viewer.entities.remove(this.activeShape);
        this.floatingPoint = undefined;
        this.activeShape = undefined;
        // this.activeShapePoints = [];
    }
    clear(){
        this.removaEntitiesAndPrimitivesByName('drawPolygon',this.viewer)
        this.removaEntitiesAndPrimitivesByName('drawLine',this.viewer)
        this.removaEntitiesAndPrimitivesByName('drawPoint',this.viewer)
    }

}