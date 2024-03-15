function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-DttnV-W0.js","assets/index-PbNlE2PN.js","assets/index-BA2UV16p.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-PbNlE2PN.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-DttnV-W0.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
