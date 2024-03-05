function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CC1qZ1V-.js","assets/index-BTEqTeDc.js","assets/index-DNWuzMQz.css","assets/index-BihgV0Qz.js","assets/index-Bu_91-YB.js","assets/index-Ct1WuP-h.js","assets/index-B6tcHPYf.js","assets/index-htX3noyc.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BTEqTeDc.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-CC1qZ1V-.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-BihgV0Qz.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-Bu_91-YB.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-Ct1WuP-h.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-B6tcHPYf.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-htX3noyc.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
