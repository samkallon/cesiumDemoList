function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-1QcOBX_8.js","assets/index-D7YM9y7U.js","assets/index-BVTA-aOP.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-D7YM9y7U.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-1QcOBX_8.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
