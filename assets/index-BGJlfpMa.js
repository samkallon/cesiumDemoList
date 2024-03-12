function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DDp1cRmc.js","assets/index-C-nI5A4m.js","assets/index-BqwBSR0A.css","assets/index-Dp0vOsUf.js","assets/index-wd_QTrj-.js","assets/index-DzdyJmpb.js","assets/index-9yXDYhVl.js","assets/index-JULqvxhm.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-C-nI5A4m.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DDp1cRmc.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-Dp0vOsUf.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-wd_QTrj-.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-DzdyJmpb.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-9yXDYhVl.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-JULqvxhm.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
