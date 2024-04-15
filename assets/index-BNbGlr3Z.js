function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DfT6hhuW.js","assets/index-0IztMWob.js","assets/index-BgIyZkuh.css","assets/index-D9rqT61F.js","assets/index-BbeqhHF3.js","assets/index-CwZzDKUC.js","assets/index-CSThYp6x.js","assets/index-D1cFuJZt.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-0IztMWob.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DfT6hhuW.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-D9rqT61F.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-BbeqhHF3.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-CwZzDKUC.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CSThYp6x.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-D1cFuJZt.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
