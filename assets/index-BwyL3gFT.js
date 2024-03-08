function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BWCC8rKF.js","assets/index-BozFUX07.js","assets/index-BlahwcRU.css","assets/index-DUkMyeHe.js","assets/index-Fe8xktZ8.js","assets/index-BBnZrKLL.js","assets/index-EOoTuh6h.js","assets/index-C_qUNlGY.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BozFUX07.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-BWCC8rKF.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DUkMyeHe.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-Fe8xktZ8.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BBnZrKLL.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-EOoTuh6h.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-C_qUNlGY.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
