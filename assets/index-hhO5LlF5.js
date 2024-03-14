function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-jcu6WlMo.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css","assets/index-hJsOWHBB.js","assets/index-BHmRrTmP.js","assets/index-Dtxv2KQ1.js","assets/index-CG9fCfMr.js","assets/index-4zC60Pb6.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-B2XVu7Yd.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-jcu6WlMo.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-hJsOWHBB.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-BHmRrTmP.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-Dtxv2KQ1.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CG9fCfMr.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-4zC60Pb6.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
