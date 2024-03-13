function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BrHvt7Kv.js","assets/index-DeSqwdbz.js","assets/index-CWIe3UeI.css","assets/index-DmzSNEir.js","assets/index-D4WyRMey.js","assets/index-Bqm0l1Ok.js","assets/index-gD3sFM5C.js","assets/index-jC6kmbkv.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DeSqwdbz.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-BrHvt7Kv.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DmzSNEir.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-D4WyRMey.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-Bqm0l1Ok.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-gD3sFM5C.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-jC6kmbkv.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
