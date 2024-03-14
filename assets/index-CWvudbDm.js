function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-CPGjDpaZ.js","assets/index-CH_VhGAs.js","assets/index-BkuiIe7t.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-CH_VhGAs.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-CPGjDpaZ.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
