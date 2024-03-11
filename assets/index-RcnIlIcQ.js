function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-DxZ-q7x1.js","assets/index-B_EjAeyx.js","assets/index-cHGinQ40.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-B_EjAeyx.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-DxZ-q7x1.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
