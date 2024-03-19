function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-BQTIbzgf.js","assets/index-Dni4I-jS.js","assets/index-CL5e1HdR.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-Dni4I-jS.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-BQTIbzgf.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
