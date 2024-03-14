function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SizeUpdater-CW2JZmjb.js","assets/index-DtfJq4_H.js","assets/index-CWIe3UeI.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-DtfJq4_H.js";async function o(t,a=!0){await t.addParticleUpdater("size",async()=>{const{SizeUpdater:e}=await r(()=>import("./SizeUpdater-CW2JZmjb.js"),__vite__mapDeps([0,1,2]));return new e},a)}export{o as loadSizeUpdater};
