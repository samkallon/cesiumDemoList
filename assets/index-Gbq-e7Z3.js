function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-UA8saajd.js","assets/index-BPkb67Lm.js","assets/index-BI_bDg5f.css","assets/index-7M-R4wXn.js","assets/index-CgwUVJR7.js","assets/index-zyg5zqBZ.js","assets/index-Dcll_qtZ.js","assets/index-DWSTxqSc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BPkb67Lm.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-UA8saajd.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-7M-R4wXn.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CgwUVJR7.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-zyg5zqBZ.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-Dcll_qtZ.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DWSTxqSc.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
