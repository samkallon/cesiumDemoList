function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-DXyLBvjz.js","assets/index-C-nI5A4m.js","assets/index-BqwBSR0A.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-C-nI5A4m.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-DXyLBvjz.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
