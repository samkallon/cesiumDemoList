function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LinksPlugin-C0aNEFAT.js","assets/index-DtfJq4_H.js","assets/index-CWIe3UeI.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-DtfJq4_H.js";async function r(i,n=!0){const{LinksPlugin:t}=await o(()=>import("./LinksPlugin-C0aNEFAT.js"),__vite__mapDeps([0,1,2])),a=new t;await i.addPlugin(a,n)}export{r as loadLinksPlugin};
