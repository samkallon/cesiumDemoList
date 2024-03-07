function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BHE9y0E4.js","assets/index-DtQWGvzT.js","assets/index-B3Jkk60T.css","assets/index-D8v-0Z01.js","assets/index-D0yWtT2g.js","assets/index-D_OksLaF.js","assets/index-DU0P7mcP.js","assets/index-DHdFXpES.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DtQWGvzT.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-BHE9y0E4.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-D8v-0Z01.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-D0yWtT2g.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-D_OksLaF.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-DU0P7mcP.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DHdFXpES.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
