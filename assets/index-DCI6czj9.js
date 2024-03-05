function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DOG6_yqe.js","assets/index-DJ2gcJVu.js","assets/index-yUNgqxcD.css","assets/index-DWzHf6AP.js","assets/index-C5Z-MNaJ.js","assets/index-DSjW03UF.js","assets/index-CSxbJWuf.js","assets/index-DJG6gb_M.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DJ2gcJVu.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DOG6_yqe.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DWzHf6AP.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-C5Z-MNaJ.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-DSjW03UF.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CSxbJWuf.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DJG6gb_M.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
