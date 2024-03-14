function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SizeUpdater-Bi1sEdhm.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-B2XVu7Yd.js";async function o(t,a=!0){await t.addParticleUpdater("size",async()=>{const{SizeUpdater:e}=await r(()=>import("./SizeUpdater-Bi1sEdhm.js"),__vite__mapDeps([0,1,2]));return new e},a)}export{o as loadSizeUpdater};
