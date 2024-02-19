<script setup>
// 瀑布流首页
import {onMounted, ref} from "vue";

const puBuLiuData = ref([])

onMounted(()=>{
  for (let i = 0; i < 100; i++) {
    puBuLiuData.value.push({
      height:Math.random()*400 + 100,
      color:getRandomColor()
    })
  }
})

function getRandomColor(){
  const r = Math.floor(Math.random()*255);
  const g = Math.floor(Math.random()*255);
  const b = Math.floor(Math.random()*255);
  return 'rgba('+ r +','+ g +','+ b +',0.8)';
}
</script>

<template>
  <div class="header">
    <div class="title">标题</div>
  </div>
  <el-scrollbar>
    <div class="content">
      <div class="item" v-for=" item in puBuLiuData" :style="{height:item.height + 'px',backgroundColor:item.color}"></div>
    </div>
  </el-scrollbar>


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
    position: relative;
    margin-bottom: 10px;
    break-inside: avoid;
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
}
</style>