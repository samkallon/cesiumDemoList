function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SizeUpdater-B-Dyql3B.js","assets/index-DtQWGvzT.js","assets/index-B3Jkk60T.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-DtQWGvzT.js";async function o(t,a=!0){await t.addParticleUpdater("size",async()=>{const{SizeUpdater:e}=await r(()=>import("./SizeUpdater-B-Dyql3B.js"),__vite__mapDeps([0,1,2]));return new e},a)}export{o as loadSizeUpdater};
