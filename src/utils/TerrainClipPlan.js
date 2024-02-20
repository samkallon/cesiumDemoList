import * as turf from '@turf/turf'
import * as Cesium from 'cesium'

function TerrainClipPlan(t ,i) {
    this.viewer = t,this.options = i || {},this._positions = i.positions,this._height = this.options.height || 0,
    this.bottomImg = i.bottomImg,this.wallImg = i.wallImg,this.splitNum = Cesium.defaultValue(i.splitNum, 50),
    this._positions && this._positions.length > 0 && this.updateTerrainClipData(this._positions)
}

Object.defineProperties(TerrainClipPlan.prototype, {
    show: {
        get: function () {
            return this._show
        },
        set: function (e) {
            this._show = e, this.viewer.scene.globe.clippingPlanes && (this.viewer.scene.globe.clippingPlanes.enabled = e), this._switchExcavate(e)
        }
    },

    height: {
        get: function () {
            return this._height
        },
        set: function (e) {
            this._height = e
        }
    }
})

/**
 *
 * @param pointList  cartesian3 数组
 */
TerrainClipPlan.prototype.updateTerrainClipData = function (pointList) {
    this.clear();
    // 对点做处理,如果不是逆时针 变为逆时针
    if(this.ifAntiClockwise(pointList)){
        pointList.reverse()
    }
    let planes = [],
        pointLength = pointList.length,
        n = Cesium.Cartesian3.subtract(pointList[0], pointList[1], new Cesium.Cartesian3);
        // n = n.x > 0, this.excavateMinHeight = 9999;
    if (n.x !== 0) this.excavateMinHeight = 9999;
    for (let i = 0; i < pointLength; ++i) {
        let nextPointIndex = (i + 1) % pointLength
        let currPointCartographic = Cesium.Cartographic.fromCartesian(pointList[i])
        let currPointHeight = this.viewer.scene.globe.getHeight(currPointCartographic) || currPointCartographic.height;
        if (currPointHeight < this.excavateMinHeight){
            this.excavateMinHeight = currPointHeight
        }

        let midpoint = Cesium.Cartesian3.add(pointList[i], pointList[nextPointIndex], new Cesium.Cartesian3());
        midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
        // 中点的单位向量
        let up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());

        let right = Cesium.Cartesian3.subtract(pointList[nextPointIndex], midpoint, new Cesium.Cartesian3());
        if(right.x===0 && right.y===0 && right.z===0){
            console.log("有点不在范围内1");
        }else{
            right = Cesium.Cartesian3.normalize(right, right);
        }
        let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
        if(normal.x===0 && normal.y===0 && normal.z===0){
            console.log("有点不在范围内2");
        }else{
            normal = Cesium.Cartesian3.normalize(normal, normal);
            let originCenteredPlane = new Cesium.Plane(normal, 0.0);
            let distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);
            planes.push(new Cesium.ClippingPlane(normal, distance));
        }
    }
    const clippingPlaneCollection = new Cesium.ClippingPlaneCollection({
        planes,
        edgeWidth: 0,
        edgeColor: Cesium.Color.WHITE,
        enabled: true,
        unionClippingRegions:false
    })
    this.viewer.scene.globe.clippingPlanes = clippingPlaneCollection

    try {
        if (window.sjswTileset){
            const clipTileset = new Cesium.ClippingPlaneCollection({
                planes,
                edgeWidth: 1,
                edgeColor: Cesium.Color.WHITE,
                modelMatrix: Cesium.Matrix4.inverse(
                  Cesium.Transforms.eastNorthUpToFixedFrame(window.sjswTileset.boundingSphere.center),
                  new Cesium.Matrix4()
                )
            })
            window.sjswTileset.clippingPlanes = clipTileset
        }
    }catch (e) {

    }

    this._prepareWell(pointList)
    this._createWell(this.wellData)
}
TerrainClipPlan.prototype.getClipPlanes = function (pointList) {
    // 对点做处理,如果不是逆时针 变为逆时针
    if(this.ifAntiClockwise(pointList)){
        pointList.reverse()
    }
    let planes = [],
        pointLength = pointList.length,
        n = Cesium.Cartesian3.subtract(pointList[0], pointList[1], new Cesium.Cartesian3);
    // n = n.x > 0, this.excavateMinHeight = 9999;
    if (n.x !== 0) this.excavateMinHeight = 9999;
    for (let i = 0; i < pointLength; ++i) {
        let nextPointIndex = (i + 1) % pointLength
        let currPointCartographic = Cesium.Cartographic.fromCartesian(pointList[i])
        let currPointHeight = this.viewer.scene.globe.getHeight(currPointCartographic) || currPointCartographic.height;
        if (currPointHeight < this.excavateMinHeight){
            this.excavateMinHeight = currPointHeight
        }

        let midpoint = Cesium.Cartesian3.add(pointList[i], pointList[nextPointIndex], new Cesium.Cartesian3());
        midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
        // 中点的单位向量
        let up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());

        let right = Cesium.Cartesian3.subtract(pointList[nextPointIndex], midpoint, new Cesium.Cartesian3());
        if(right.x===0 && right.y===0 && right.z===0){
            console.log("有点不在范围内1");
        }else{
            right = Cesium.Cartesian3.normalize(right, right);
        }
        let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
        if(normal.x===0 && normal.y===0 && normal.z===0){
            console.log("有点不在范围内2");
        }else{
            normal = Cesium.Cartesian3.normalize(normal, normal);
            let originCenteredPlane = new Cesium.Plane(normal, 0.0);
            let distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);
            planes.push(new Cesium.ClippingPlane(normal, distance));
        }
    }
    const clippingPlaneCollection = new Cesium.ClippingPlaneCollection({
        planes,
        edgeWidth: 0,
        edgeColor: Cesium.Color.WHITE,
        enabled: true,
        unionClippingRegions:false
    })
    return clippingPlaneCollection
}
TerrainClipPlan.prototype.clear = function () {

    if(this.viewer.scene.globe.clippingPlanes){
        this.viewer.scene.globe.clippingPlanes.enabled = false
        if (!this.viewer.scene.globe.clippingPlanes.isDestroyed()){
            this.viewer.scene.globe.clippingPlanes.removeAll()
            // this.viewer.scene.globe.clippingPlanes.destroy()
        }
    }
    if (window?.sjswTileset?.clippingPlanes?.removeAll){
        window.sjswTileset.clippingPlanes.removeAll()
    }
    if(this.bottomSurface){
        this.viewer.scene.primitives.remove(this.bottomSurface)
        delete this.bottomSurface
    }
    if (this.wellWall){
        this.viewer.scene.primitives.remove(this.wellWall)
        delete this.wellWall
    }
    this.viewer.scene.render()
}

TerrainClipPlan.prototype._prepareWell = function (e) {
    var t = this.splitNum,
        i = e.length;
    if (0 != i) {
        for (var a = this.excavateMinHeight - this.height, n = [], r = [], s = [], l = 0; l < i; l++) {
            var u = l == i - 1 ? 0 : l + 1,
                c = Cesium.Cartographic.fromCartesian(e[l]),
                d = Cesium.Cartographic.fromCartesian(e[u]),
                h = [c.longitude, c.latitude],
                f = [d.longitude, d.latitude];

            0 == l && (
                s.push(new Cesium.Cartographic(h[0], h[1])),
                    r.push(Cesium.Cartesian3.fromRadians(h[0], h[1], a)),
                    n.push(Cesium.Cartesian3.fromRadians(h[0], h[1], 0)));

            for (var p = 1; p <= t; p++) {
                var m = Cesium.Math.lerp(h[0], f[0], p / t),
                    g = Cesium.Math.lerp(h[1], f[1], p / t);
                l == i - 1 && p == t || (
                    s.push(new Cesium.Cartographic(m, g)),
                        r.push(Cesium.Cartesian3.fromRadians(m, g, a)),
                        n.push(Cesium.Cartesian3.fromRadians(m, g, 0)))
            }
        }
        this.wellData = {
            lerp_pos: s,
            bottom_pos: r,
            no_height_top: n
        }
    }
}

TerrainClipPlan.prototype._createWell = function (e) {
    if (Boolean(this.viewer.terrainProvider._layers)) {
        var t = this;
        this._createBottomSurface(e.bottom_pos);
        var i = Cesium.sampleTerrainMostDetailed(this.viewer.terrainProvider, e.lerp_pos);
        i.then(ies=>{
            for (var a = ies.length, n = [], r = 0; r < a; r++) {
                var s = Cesium.Cartesian3.fromRadians(ies[r].longitude, ies[r].latitude, ies[r].height);
                n.push(s)
            }
            t._createWellWall(e.bottom_pos, n)
        })
    } else {
        this._createBottomSurface(e.bottom_pos);
        this._createWellWall(e.bottom_pos, e.no_height_top)
    }
}


TerrainClipPlan.prototype._getMinHeight = function (e) {
    var minHeight = 50000000;
    var minPoint = null;
    for (var i = 0; i < e.length; i++) {
        var height = e[i]['z'];
        if (height < minHeight) {
            minHeight = height;
            minPoint = this._ellipsoidToLonLat(e[i]);
        }
    }
    return minPoint.altitude;
}


TerrainClipPlan.prototype._ellipsoidToLonLat = function (c) {
    var ellipsoid = this.viewer.scene.globe.ellipsoid;
    var cartesian3 = new Cesium.Cartesian3(c.x, c.y, c.z);
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var alt = cartographic.height;
    return {
        longitude: lng,
        latitude: lat,
        altitude: alt
    }
}
TerrainClipPlan.prototype._createBottomSurface = function (e) {
    if (e.length) {
        var minHeight = this._getMinHeight(e);
        var positions = [];
        for (var i = 0; i < e.length; i++) {
            var p = this._ellipsoidToLonLat(e[i]);
            positions.push(p.longitude);
            positions.push(p.latitude);
            positions.push(minHeight);
        }

        var polygon = new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArrayHeights(positions)
            ),
            perPositionHeight: true,
            closeBottom: false
        });
        var geometry = Cesium.PolygonGeometry.createGeometry(polygon);

        var i = new Cesium.Material({
                fabric : {
                    type : 'Image',
                    uniforms : {
                        image : this.bottomImg
                    }
                }
            }),
            a = new Cesium.MaterialAppearance({
                translucent: !1,
                flat: !0,
                material: i
            });
        this.bottomSurface = new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: a,
            asynchronous: !1
        }), this.viewer.scene.primitives.add(this.bottomSurface)
    }
}

TerrainClipPlan.prototype._createWellWall = function (e, t) {
    var minHeight = this._getMinHeight(e);
    var maxHeights = [];
    var minHeights = [];
    for (var i = 0; i < t.length; i++) {
        maxHeights.push(this._ellipsoidToLonLat(t[i]).altitude);
        minHeights.push(minHeight);
    }
    var wall = new Cesium.WallGeometry({
        positions: t,
        maximumHeights: maxHeights,
        minimumHeights: minHeights,
    });
    var geometry = Cesium.WallGeometry.createGeometry(wall);
    var a = new Cesium.Material({
            fabric: {
                type: "Image",
                uniforms: {
                    image: this.wallImg
                }
            }
        }),
        n = new Cesium.MaterialAppearance({
            translucent: !1,
            flat: !0,
            material: a
        });
    this.wellWall = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: geometry,
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.GREY)
            },
            id: "PitWall"
        }),
        appearance: n,
        asynchronous: !1
    }), this.viewer.scene.primitives.add(this.wellWall)
}
TerrainClipPlan.prototype._switchExcavate = function (e) {
    e ? (this.viewer.scene.globe.material = Cesium.Material.fromType("WaJue"), this.wellWall.show = !0, this.bottomSurface.show = !0) : (this.viewer.scene.globe.material = null, this.wellWall.show = !1, this.bottomSurface.show = !1)
}

TerrainClipPlan.prototype._updateExcavateDepth = function (e) {
    this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface), this.wellWall && this.viewer.scene.primitives.remove(this.wellWall);
    for (var t = this.wellData.lerp_pos, i = [], a = t.length, n = 0; n < a; n++) i.push(Cesium.Cartesian3.fromRadians(t[n].longitude, t[n].latitude, this.excavateMinHeight - e));
    this.wellData.bottom_pos = i, this._createWell(this.wellData), this.viewer.scene.primitives.add(this.bottomSurface), this.viewer.scene.primitives.add(this.wellWall)
}

// 判断坐标串是否为逆时针
TerrainClipPlan.prototype.ifAntiClockwise = function (e) {
    //找凸点
    var pointList = JSON.parse(JSON.stringify(e))
    pointList.push(pointList[0])
    var pointListGeo = turf.lineString(pointList.map((point,index)=>{
        return this.getLatLngFromXZY(point)
    }))
    var dirRes = turf.booleanClockwise(pointListGeo)
    return dirRes
}

// 世界坐标转经纬度
TerrainClipPlan.prototype.getLatLngFromXZY = function (e) {
    var ellipsoid = this.viewer.scene.globe.ellipsoid;
    var cartesian3 = new Cesium.Cartesian3(e.x,e.y,e.z);
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var height = cartographic.height;
    return [longitude,latitude]
}


export default TerrainClipPlan
