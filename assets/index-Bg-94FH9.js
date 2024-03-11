function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/CircleDrawer-O3yuZLj2.js","assets/index-B_EjAeyx.js","assets/index-cHGinQ40.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-B_EjAeyx.js";async function o(a,e=!0){const{CircleDrawer:r}=await i(()=>import("./CircleDrawer-O3yuZLj2.js"),__vite__mapDeps([0,1,2]));await a.addShape("circle",new r,e)}export{o as loadCircleShape};
