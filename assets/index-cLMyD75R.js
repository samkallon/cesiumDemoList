function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-jt0xAEwj.js","assets/index-BxWxPUpI.js","assets/index-740QA-4A.css","assets/index-CiI8Hq6I.js","assets/index-CwIu3UMV.js","assets/index-BRXuy7ne.js","assets/index-BBMABwQZ.js","assets/index-BEmmsBAZ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BxWxPUpI.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-jt0xAEwj.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-CiI8Hq6I.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CwIu3UMV.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BRXuy7ne.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-BBMABwQZ.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-BEmmsBAZ.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
