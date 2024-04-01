function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LinksPlugin-0vktRB4c.js","assets/index-Dlcfk_Dy.js","assets/index-B8XqHSQ1.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-Dlcfk_Dy.js";async function r(i,n=!0){const{LinksPlugin:t}=await o(()=>import("./LinksPlugin-0vktRB4c.js"),__vite__mapDeps([0,1,2])),a=new t;await i.addPlugin(a,n)}export{r as loadLinksPlugin};
