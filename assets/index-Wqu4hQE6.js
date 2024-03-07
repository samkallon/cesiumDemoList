function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-F0Uc4zi5.js","assets/index-XHoUFeLX.js","assets/index-B3c8MQar.css","assets/index-qkeUjECf.js","assets/index-CLkEyT13.js","assets/index-Dzv6HZyp.js","assets/index-Dhd_vwrK.js","assets/index-6jHxOfqb.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-XHoUFeLX.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-F0Uc4zi5.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-qkeUjECf.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CLkEyT13.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-Dzv6HZyp.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-Dhd_vwrK.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-6jHxOfqb.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
