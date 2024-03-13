function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/CircleDrawer-Ca5Xsie5.js","assets/index-CEkHyhHC.js","assets/index-CWIe3UeI.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-CEkHyhHC.js";async function o(a,e=!0){const{CircleDrawer:r}=await i(()=>import("./CircleDrawer-Ca5Xsie5.js"),__vite__mapDeps([0,1,2]));await a.addShape("circle",new r,e)}export{o as loadCircleShape};
