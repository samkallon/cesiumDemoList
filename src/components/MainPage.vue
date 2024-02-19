<script setup>
// 瀑布流首页
import {onMounted, ref} from "vue";
import demoList from "../../public/demoList.js";
import {getAssetsFile} from "@/utils/utils.js";
import DigTerrian from "@/components/demos/DigTerrian/DigTerrian.vue";
const compDic = {
  'DigTerrian':DigTerrian
}

const puBuLiuData = ref([])

onMounted(()=>{
  for (let i = 0; i < demoList.length; i++) {
    puBuLiuData.value.push({
      imgUrl:demoList[i].imgUrl,
      title:demoList[i].title,
      compName:demoList[i].compName,
    })
  }
})

const demoShow = ref(false)
const currentComponent = ref('')
async function showDemo(item) {
  demoShow.value = true
  currentComponent.value = compDic[item.compName]
}
</script>

<template>
  <div class="header">
    <div class="title">标题</div>
  </div>
  <el-scrollbar>
    <div class="content">
      <div class="item" v-for=" item in puBuLiuData" @click="showDemo(item)">
          <img :src="getAssetsFile(item.imgUrl)" alt="" style="width: 100%">
          <div class="item-title">{{item.title}}</div>
      </div>
    </div>
  </el-scrollbar>
  <el-dialog class="demoDialog" v-model="demoShow" width="90%" top="5vh">
    <component :is="currentComponent"></component>
  </el-dialog>


</template>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 50px;
  background: #213547;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  .title{
    color: white;
    font-size: 26px;
    margin-left: 8px;
  }
}
.content{
  column-count: 4;
  column-gap: 10px;

  counter-reset: count;
  width: calc(100% - 16px);
  height: calc(100% - 50px);
  margin-top: 58px;
  margin-left: 8px;
  .item{
    cursor: pointer;
    position: relative;
    margin-bottom: 10px;
    break-inside: avoid;
    .item-title{
      box-sizing: border-box;
      position: absolute;
      bottom: 4px;
      color: white;
      background: rgba(0, 0, 0, 0.37);
      width: 100%;
      padding:8px
    }
  }
  item::after{
    counter-increment: count;
    content: counter(count);
    width: 2em;
    height: 2em;
    background-color: rgba(0,0,0,0.9);
    color: #ffffff;
    line-height: 2em;
    text-align: center;
    position: absolute;
    font-size: 1em;
    z-index: 2;
    left: 0;
    top: 0;
  }
  item:hover{
    transform: scale(1.2);
  }
}
</style>