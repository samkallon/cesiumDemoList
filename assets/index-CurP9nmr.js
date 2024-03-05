function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-148-lXMc.js","assets/index-BQ0X4e1c.js","assets/index-DkVtnCES.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-BQ0X4e1c.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-148-lXMc.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
