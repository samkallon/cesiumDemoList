function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ParallaxMover-BiUHUd2a.js","assets/index-BxWxPUpI.js","assets/index-740QA-4A.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BxWxPUpI.js";async function l(a,r=!0){await a.addMover("parallax",async()=>{const{ParallaxMover:o}=await t(()=>import("./ParallaxMover-BiUHUd2a.js"),__vite__mapDeps([0,1,2]));return new o},r)}export{l as loadParallaxMover};
