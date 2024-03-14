function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/RotateUpdater-DXCtKI7S.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css","assets/ValueWithRandom-Dd6ePqzx.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-B2XVu7Yd.js";async function i(t,a=!0){await t.addParticleUpdater("rotate",async e=>{const{RotateUpdater:r}=await o(()=>import("./RotateUpdater-DXCtKI7S.js"),__vite__mapDeps([0,1,2,3]));return new r(e)},a)}export{i as loadRotateUpdater};
