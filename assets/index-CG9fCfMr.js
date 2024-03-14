function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/OutOfCanvasUpdater-BUgid_W4.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-B2XVu7Yd.js";async function i(t,a=!0){await t.addParticleUpdater("outModes",async e=>{const{OutOfCanvasUpdater:r}=await o(()=>import("./OutOfCanvasUpdater-BUgid_W4.js"),__vite__mapDeps([0,1,2]));return new r(e)},a)}export{i as loadOutModesUpdater};
