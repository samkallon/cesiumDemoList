function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ParallaxMover-D4s0a6Vv.js","assets/index-XHoUFeLX.js","assets/index-B3c8MQar.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-XHoUFeLX.js";async function l(a,r=!0){await a.addMover("parallax",async()=>{const{ParallaxMover:o}=await t(()=>import("./ParallaxMover-D4s0a6Vv.js"),__vite__mapDeps([0,1,2]));return new o},r)}export{l as loadParallaxMover};
