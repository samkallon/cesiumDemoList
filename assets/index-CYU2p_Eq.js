function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DOlwtlN3.js","assets/index-Dlcfk_Dy.js","assets/index-B8XqHSQ1.css","assets/index-CXC-ewR7.js","assets/index-Cv6K6NWf.js","assets/index--ubntViW.js","assets/index-BYMfUmdk.js","assets/index-DaUnl2s0.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-Dlcfk_Dy.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DOlwtlN3.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-CXC-ewR7.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-Cv6K6NWf.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index--ubntViW.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-BYMfUmdk.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DaUnl2s0.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
