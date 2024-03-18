function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DdPV8o3q.js","assets/index-D7YM9y7U.js","assets/index-BVTA-aOP.css","assets/index-DZClvwLk.js","assets/index-C6E0Qnue.js","assets/index-CJgnGy0h.js","assets/index-C5t3Yi0x.js","assets/index-Q9W153E7.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-D7YM9y7U.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DdPV8o3q.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DZClvwLk.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-C6E0Qnue.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-CJgnGy0h.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-C5t3Yi0x.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-Q9W153E7.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
