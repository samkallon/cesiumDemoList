function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ParallaxMover-CSl7Q-sM.js","assets/index-DtfJq4_H.js","assets/index-CWIe3UeI.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DtfJq4_H.js";async function l(a,r=!0){await a.addMover("parallax",async()=>{const{ParallaxMover:o}=await t(()=>import("./ParallaxMover-CSl7Q-sM.js"),__vite__mapDeps([0,1,2]));return new o},r)}export{l as loadParallaxMover};
