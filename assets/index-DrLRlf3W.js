function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-CQXJP7Kd.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-B2XVu7Yd.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-CQXJP7Kd.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
