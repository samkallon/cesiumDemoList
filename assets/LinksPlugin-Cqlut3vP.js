function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LinkInstance-CZv_zP8m.js","assets/index-B2XVu7Yd.js","assets/index-DnrSn2kM.css","assets/CanvasUtils-Cn3ubFQm.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-B2XVu7Yd.js";class s{constructor(){this.id="links"}async getPlugin(n){const{LinkInstance:t}=await i(()=>import("./LinkInstance-CZv_zP8m.js"),__vite__mapDeps([0,1,2,3]));return new t(n)}loadOptions(){}needsPlugin(){return!0}}export{s as LinksPlugin};
