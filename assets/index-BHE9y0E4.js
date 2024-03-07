function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-Cv-EpqUi.js","assets/index-DtQWGvzT.js","assets/index-B3Jkk60T.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-DtQWGvzT.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-Cv-EpqUi.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
