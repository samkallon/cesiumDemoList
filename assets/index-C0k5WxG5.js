function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-DFk5HuLp.js","assets/index-BPkb67Lm.js","assets/index-BI_bDg5f.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-BPkb67Lm.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-DFk5HuLp.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
