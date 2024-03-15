function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-BWqVa1SK.js","assets/index-PbNlE2PN.js","assets/index-BA2UV16p.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-PbNlE2PN.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-BWqVa1SK.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
