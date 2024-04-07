function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-B_M2krsz.js","assets/index-BmQw6kWS.js","assets/index-DMT5yqCz.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-BmQw6kWS.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-B_M2krsz.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
