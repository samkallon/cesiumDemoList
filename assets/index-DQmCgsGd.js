var m;(function(t){t.bottom="bottom",t.bottomLeft="bottom-left",t.bottomRight="bottom-right",t.left="left",t.none="none",t.right="right",t.top="top",t.topLeft="top-left",t.topRight="top-right",t.outside="outside",t.inside="inside"})(m||(m={}));function i(t){return typeof t=="number"}let S=Math.random;function R(){return C(S(),0,1-Number.EPSILON)}function C(t,n,e){return Math.min(Math.max(t,n),e)}function I(t){const n=E(t),e=0;let r=F(t);return n===r&&(r=e),R()*(n-r)+r}function T(t){return i(t)?t:I(t)}function F(t){return i(t)?t:t.min}function E(t){return i(t)?t:t.max}function L(t){return t*Math.PI/180}var d;(function(t){t.auto="auto",t.increase="increase",t.decrease="decrease",t.random="random"})(d||(d={}));var g;(function(t){t.increasing="increasing",t.decreasing="decreasing"})(g||(g={}));var f;(function(t){t.none="none",t.max="max",t.min="min"})(f||(f={}));var l;(function(t){t.bottom="bottom",t.left="left",t.right="right",t.top="top"})(l||(l={}));var h;(function(t){t.precise="precise",t.percent="percent"})(h||(h={}));var p;(function(t){t.max="max",t.min="min",t.random="random"})(p||(p={}));function c(t,n){if(t.version!==n)throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${t.version}. Plugins version: ${n}`)}const N=180,a={x:0,y:0},$=2;function v(t,n,e){const{context:r}=t,s=e.count.numerator*e.count.denominator,o=e.count.numerator/e.count.denominator,w=N*(o-$)/o,P=Math.PI-L(w);if(r){r.beginPath(),r.translate(n.x,n.y),r.moveTo(a.x,a.y);for(let u=0;u<s;u++)r.lineTo(e.length,a.y),r.translate(e.length,a.y),r.rotate(P)}}const B=5;class b{draw(n){const{particle:e,radius:r}=n,s=this.getCenter(e,r),o=this.getSidesData(e,r);v(n,s,o)}getSidesCount(n){const e=n.shapeData;return Math.round(T((e==null?void 0:e.sides)??B))}}const x=3.5,y=2.66,G=3;class O extends b{constructor(){super(...arguments),this.validTypes=["polygon"]}getCenter(n,e){return{x:-e/(n.sides/x),y:-e/(y/x)}}getSidesData(n,e){const r=n.sides;return{count:{denominator:1,numerator:r},length:e*y/(r/G)}}}const V=1.66,_=3,j=2;class k extends b{constructor(){super(...arguments),this.validTypes=["triangle"]}getCenter(n,e){return{x:-e,y:e/V}}getSidesCount(){return _}getSidesData(n,e){const r=e*j;return{count:{denominator:2,numerator:3},length:r}}}async function q(t,n=!0){c(t,"3.7.1"),await t.addShape(new O,n)}async function z(t,n=!0){c(t,"3.7.1"),await t.addShape(new k,n)}async function A(t,n=!0){c(t,"3.7.1"),await q(t,n),await z(t,n)}export{q as loadGenericPolygonShape,A as loadPolygonShape,z as loadTriangleShape};