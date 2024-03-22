function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-471nXbwj.js","assets/index-B_m-yJYC.js","assets/index-DiZaKwlN.css","assets/index-Diulycqk.js","assets/index-CtEDWUTU.js","assets/index-C3Ki_dTB.js","assets/index-BpdEWx68.js","assets/index-B3GxNoZE.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-B_m-yJYC.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-471nXbwj.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-Diulycqk.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CtEDWUTU.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-C3Ki_dTB.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-BpdEWx68.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-B3GxNoZE.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
