function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CWvudbDm.js","assets/index-CH_VhGAs.js","assets/index-BkuiIe7t.css","assets/index-Kg0YEvSO.js","assets/index-DKKWmjVK.js","assets/index-BrpFmejT.js","assets/index-ChVfnxPT.js","assets/index-BaToBj5N.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-CH_VhGAs.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-CWvudbDm.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-Kg0YEvSO.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-DKKWmjVK.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BrpFmejT.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-ChVfnxPT.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-BaToBj5N.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
