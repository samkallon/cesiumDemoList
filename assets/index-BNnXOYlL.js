function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CtWOx1Mp.js","assets/index-hIUGClFx.js","assets/index-JpLTLaI7.css","assets/index-Cx-0rEQj.js","assets/index-CvEzd13C.js","assets/index-DsDe-qO2.js","assets/index-BDZntz8r.js","assets/index-C-yJXYEj.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-hIUGClFx.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-CtWOx1Mp.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-Cx-0rEQj.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CvEzd13C.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-DsDe-qO2.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-BDZntz8r.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-C-yJXYEj.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
