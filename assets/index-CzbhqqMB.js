function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BTljYdgT.js","assets/index-CEkHyhHC.js","assets/index-CWIe3UeI.css","assets/index-jBMPhlKi.js","assets/index-D6QU5Kdd.js","assets/index-BH4goF__.js","assets/index-DorYzlGx.js","assets/index-DXXGfU9S.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-CEkHyhHC.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-BTljYdgT.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-jBMPhlKi.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-D6QU5Kdd.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BH4goF__.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-DorYzlGx.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DXXGfU9S.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
