function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-B9P_MCAD.js","assets/index-BiDV4YC3.js","assets/index-CQbql66e.css","assets/index-BxPfba6p.js","assets/index-B3m2sIPr.js","assets/index-B72HQ-Vu.js","assets/index-g1HSXRq7.js","assets/index-D2E1Wj6K.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BiDV4YC3.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-B9P_MCAD.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-BxPfba6p.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-B3m2sIPr.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-B72HQ-Vu.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-g1HSXRq7.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-D2E1Wj6K.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
