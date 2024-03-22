function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-zetp4hom.js","assets/index-BPkb67Lm.js","assets/index-BI_bDg5f.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-BPkb67Lm.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-zetp4hom.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
