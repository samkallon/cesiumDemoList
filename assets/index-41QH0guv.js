function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-B0kOCuMw.js","assets/index-bdAVHIY0.js","assets/index-Bor8dRrR.css","assets/index-BWL1Srwy.js","assets/index-BiNMcp-j.js","assets/index-BtPFjz1_.js","assets/index-C311G_Vg.js","assets/index-B9LNNR2g.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-bdAVHIY0.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-B0kOCuMw.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-BWL1Srwy.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-BiNMcp-j.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BtPFjz1_.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-C311G_Vg.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-B9LNNR2g.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
