function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DVrl943x.js","assets/index-Dni4I-jS.js","assets/index-CL5e1HdR.css","assets/index-BvTz41Q7.js","assets/index-_HN0fy92.js","assets/index-CJnqZz8T.js","assets/index-CdrzDoHp.js","assets/index-TOW0X_68.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-Dni4I-jS.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-DVrl943x.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-BvTz41Q7.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-_HN0fy92.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-CJnqZz8T.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CdrzDoHp.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-TOW0X_68.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
