function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DmygJtPc.js","assets/index-CEVqXaI7.js","assets/index-cmRmTsHh.css","assets/index-CoupxNrE.js","assets/index-CP0g3Kxk.js","assets/index-CtHcdIp1.js","assets/index-Dt9mcaqR.js","assets/index-DG6xNxTl.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-CEVqXaI7.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DmygJtPc.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-CoupxNrE.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CP0g3Kxk.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-CtHcdIp1.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-Dt9mcaqR.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DG6xNxTl.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
