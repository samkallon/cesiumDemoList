function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LinksPlugin-UWtomTwo.js","assets/index-B_EjAeyx.js","assets/index-cHGinQ40.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-B_EjAeyx.js";async function r(i,n=!0){const{LinksPlugin:t}=await o(()=>import("./LinksPlugin-UWtomTwo.js"),__vite__mapDeps([0,1,2])),a=new t;await i.addPlugin(a,n)}export{r as loadLinksPlugin};
