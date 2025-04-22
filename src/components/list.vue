<script setup>
import demoList from "/public/demoList.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
import {getAssetsFile} from "@/utils/utils.js";
import {ElMessage} from "element-plus";
const puBuLiuData = ref(demoList)

async function showDemo(item) {
  router.push(item.compName)
  if (!item.compName){
    ElMessage.info('功能开发中!')
    return
  }
}

</script>

<template>
  <el-scrollbar>
    <div class="content">
      <div class="item" v-for=" item in puBuLiuData" @click="showDemo(item)" >
        <video v-if="item.imgUrl.indexOf('mp4') > -1" :src="getAssetsFile(item.imgUrl)" autoplay muted loop alt="" style="width: 100%"/>
        <img v-else :src="getAssetsFile(item.imgUrl)" alt="" style="width: 100%">
        <div class="item-title">{{item.title}}</div>
        <div class="item-title todo" v-if="!item.compName">功能开发中...</div>
      </div>
    </div>
  </el-scrollbar>

</template>

<style scoped lang="scss">
.content{
  column-count: 5;
  column-gap: 20px;

  counter-reset: count;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding:10px;

  .item{
    font-size: 18px;
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
    .todo{
      top: 0px;
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
