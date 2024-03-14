function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-Dkl1Njwe.js","assets/index-DZn8UX5g.js","assets/index-BA2UV16p.css","assets/index-fDOUokEL.js","assets/index-B0lZdITm.js","assets/index-BSw1fMy1.js","assets/index-nVrUwKQi.js","assets/index-BL_0vpKh.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DZn8UX5g.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-Dkl1Njwe.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-fDOUokEL.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-B0lZdITm.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BSw1fMy1.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-nVrUwKQi.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-BL_0vpKh.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
