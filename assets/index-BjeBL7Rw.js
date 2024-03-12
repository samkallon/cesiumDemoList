function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ParallaxMover-C-2F5JQr.js","assets/index-C-nI5A4m.js","assets/index-BqwBSR0A.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-C-nI5A4m.js";async function l(a,r=!0){await a.addMover("parallax",async()=>{const{ParallaxMover:o}=await t(()=>import("./ParallaxMover-C-2F5JQr.js"),__vite__mapDeps([0,1,2]));return new o},r)}export{l as loadParallaxMover};
