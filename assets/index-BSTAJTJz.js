function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DMX_6ney.js","assets/index-B_EjAeyx.js","assets/index-cHGinQ40.css","assets/index-Bg-94FH9.js","assets/index-BKLUYQEc.js","assets/index-p-3pda77.js","assets/index-BhP5o7jD.js","assets/index-B6DnbFwH.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-B_EjAeyx.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DMX_6ney.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-Bg-94FH9.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-BKLUYQEc.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-p-3pda77.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-BhP5o7jD.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-B6DnbFwH.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
