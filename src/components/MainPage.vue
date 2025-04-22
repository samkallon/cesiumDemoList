<script setup>
// 瀑布流首页
import {onMounted, ref} from "vue";
import demoList from "../../public/demoList.js";
import {getAssetsFile} from "@/utils/utils.js";
import tsParticleEmitter from '/public/tsParticle/tsParticleEmitter.json'
import {useRouter} from "vue-router";
const router = useRouter()

const puBuLiuData = ref([])
const selectTypeList = ref([])
onMounted(()=>{
  for (let i = 0; i < demoList.length; i++) {
    if (demoList[i].compName){
      puBuLiuData.value.push({
        imgUrl:demoList[i].imgUrl,
        title:demoList[i].title,
        compName:demoList[i].compName,
      })
    }
  }
  selectTypeList.value = Array.from(new Set(
      demoList.map(e=>{
        return e.tag
      }).flat(1))
  ).map(e=>{
    return {
      label:e,
      value:e
    }
  })
  selectTypeList.value.unshift({
    label:'已完成',
    value:'已完成'
  })
  selectTypeList.value.unshift({
    label:'全部',
    value:''
  })
})


</script>

<template>
    <vue-particles id="bg" :options="tsParticleEmitter"></vue-particles>
    <div class="header">
      <div class="title" @click="router.push('/')">CESIUM示例</div>
      <el-link href="https://www.samkallon.top" type="primary" style="margin-right: 8px">博客</el-link>
      <el-link href="https://www.samkallon.top/three-demo-list" type="primary" style="margin-right: 8px">ThreeDemo</el-link>
    </div>
  <div class="con">
    <router-view></router-view>
  </div>

</template>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 60px;
  background: #213547;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  .title{
    color: white;
    font-size: 32px;
    margin-left: 24px;
    flex-grow: 2;
    cursor: pointer;
  }
}

.con{
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 60px;
}

</style>
