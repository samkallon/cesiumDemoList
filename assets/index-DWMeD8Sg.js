function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ParallaxMover-vKPduGaV.js","assets/index-BmQw6kWS.js","assets/index-DMT5yqCz.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BmQw6kWS.js";async function l(a,r=!0){await a.addMover("parallax",async()=>{const{ParallaxMover:o}=await t(()=>import("./ParallaxMover-vKPduGaV.js"),__vite__mapDeps([0,1,2]));return new o},r)}export{l as loadParallaxMover};
