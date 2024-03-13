function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-5fI8TV1y.js","assets/index-DatDrvBo.js","assets/index-Bxy4VSym.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-DatDrvBo.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-5fI8TV1y.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
