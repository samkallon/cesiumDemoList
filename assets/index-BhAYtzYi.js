function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-DXnYCkPp.js","assets/index-BxWxPUpI.js","assets/index-740QA-4A.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-BxWxPUpI.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-DXnYCkPp.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
