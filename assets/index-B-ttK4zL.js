function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-DuuaK8OP.js","assets/index-DatDrvBo.js","assets/index-Bxy4VSym.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-DatDrvBo.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-DuuaK8OP.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
