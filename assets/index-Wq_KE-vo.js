function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-B-ttK4zL.js","assets/index-DatDrvBo.js","assets/index-Bxy4VSym.css","assets/index-ohaLfbgl.js","assets/index-FzvnXZiQ.js","assets/index-COM10rCv.js","assets/index-B4IVx1cV.js","assets/index-DbDHFsrc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DatDrvBo.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-B-ttK4zL.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-ohaLfbgl.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-FzvnXZiQ.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-COM10rCv.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-B4IVx1cV.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DbDHFsrc.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
