function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SizeUpdater-C4PX1arb.js","assets/index-DJ2gcJVu.js","assets/index-yUNgqxcD.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-DJ2gcJVu.js";async function o(t,a=!0){await t.addParticleUpdater("size",async()=>{const{SizeUpdater:e}=await r(()=>import("./SizeUpdater-C4PX1arb.js"),__vite__mapDeps([0,1,2]));return new e},a)}export{o as loadSizeUpdater};
