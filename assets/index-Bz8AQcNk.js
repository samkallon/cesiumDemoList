function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-ChD6s6Eh.js","assets/index-BiDV4YC3.js","assets/index-CQbql66e.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-BiDV4YC3.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-ChD6s6Eh.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
