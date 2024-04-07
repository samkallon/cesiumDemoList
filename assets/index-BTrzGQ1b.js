function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-Cp9a2lj6.js","assets/index-BmQw6kWS.js","assets/index-DMT5yqCz.css","assets/index-eAAnyJIK.js","assets/index-CSB1SBFd.js","assets/index-B8nj_fsI.js","assets/index-E-w-Zi4n.js","assets/index-fm3SYTgk.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BmQw6kWS.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-Cp9a2lj6.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-eAAnyJIK.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CSB1SBFd.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-B8nj_fsI.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-E-w-Zi4n.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-fm3SYTgk.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
