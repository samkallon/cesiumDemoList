function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-GSOuiBxk.js","assets/index-PbNlE2PN.js","assets/index-BA2UV16p.css","assets/index-DWsiUTVh.js","assets/index-DGsVD7z1.js","assets/index-DyxeYnZ8.js","assets/index-Bcd0aToF.js","assets/index-BHoCWLiK.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-PbNlE2PN.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-GSOuiBxk.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DWsiUTVh.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-DGsVD7z1.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-DyxeYnZ8.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-Bcd0aToF.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-BHoCWLiK.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
