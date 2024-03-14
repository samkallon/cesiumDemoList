function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CdPeVN6E.js","assets/index-DtfJq4_H.js","assets/index-CWIe3UeI.css","assets/index-D-hlWlon.js","assets/index-B5Ze1an2.js","assets/index-BvniAvqA.js","assets/index-B1LrWD44.js","assets/index-CwTwco0C.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DtfJq4_H.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-CdPeVN6E.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-D-hlWlon.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-B5Ze1an2.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BvniAvqA.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-B1LrWD44.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-CwTwco0C.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
