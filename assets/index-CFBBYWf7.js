function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-CGwZr1qS.js","assets/index-0IztMWob.js","assets/index-BgIyZkuh.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-0IztMWob.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-CGwZr1qS.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
