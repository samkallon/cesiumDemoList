function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SizeUpdater-DG-TgsWF.js","assets/index-BTEqTeDc.js","assets/index-DNWuzMQz.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-BTEqTeDc.js";async function o(t,a=!0){await t.addParticleUpdater("size",async()=>{const{SizeUpdater:e}=await r(()=>import("./SizeUpdater-DG-TgsWF.js"),__vite__mapDeps([0,1,2]));return new e},a)}export{o as loadSizeUpdater};
