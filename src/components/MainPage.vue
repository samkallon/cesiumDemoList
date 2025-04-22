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
onMounted(() => {
  for (let i = 0; i < demoList.length; i++) {
    if (demoList[i].compName) {
      puBuLiuData.value.push({
        imgUrl: demoList[i].imgUrl,
        title: demoList[i].title,
        compName: demoList[i].compName,
      })
    }
  }
  selectTypeList.value = Array.from(new Set(
    demoList.map(e => {
      return e.tag
    }).flat(1))
  ).map(e => {
    return {
      label: e,
      value: e
    }
  })
  selectTypeList.value.unshift({
    label: '已完成',
    value: '已完成'
  })
  selectTypeList.value.unshift({
    label: '全部',
    value: ''
  })
})

</script>

<template>


</template>

<style scoped lang="scss">


</style>
