function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-U5orB-YP.js","assets/index-DJ2gcJVu.js","assets/index-yUNgqxcD.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-DJ2gcJVu.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-U5orB-YP.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
