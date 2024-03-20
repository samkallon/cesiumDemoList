function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-QldCR2Vc.js","assets/index-D6epBzVb.js","assets/index-cmRmTsHh.css","assets/index-Dmu5o9H6.js","assets/index-CTM6k6Kz.js","assets/index-KJBI7zDM.js","assets/index-BNLOkUEM.js","assets/index-BsZm1KR7.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-D6epBzVb.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-QldCR2Vc.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-Dmu5o9H6.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CTM6k6Kz.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-KJBI7zDM.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-BNLOkUEM.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-BsZm1KR7.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
