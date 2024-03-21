function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-DaSJoDrz.js","assets/index-bdAVHIY0.js","assets/index-Bor8dRrR.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-bdAVHIY0.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-DaSJoDrz.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
