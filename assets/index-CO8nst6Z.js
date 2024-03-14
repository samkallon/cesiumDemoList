function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LifeUpdater-Doe8uAT_.js","assets/ValueWithRandom-Dd6ePqzx.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-B2XVu7Yd.js";async function d(t,a=!0){await t.addParticleUpdater("life",async e=>{const{LifeUpdater:r}=await i(()=>import("./LifeUpdater-Doe8uAT_.js"),__vite__mapDeps([0,1,2,3]));return new r(e)},a)}export{d as loadLifeUpdater};
