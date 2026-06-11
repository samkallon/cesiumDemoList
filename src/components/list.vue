<script setup>
import demoList from "/public/demoList.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
import {getAssetsFile} from "@/utils/utils.js";
import {ElMessage} from "element-plus";
const puBuLiuData = ref(demoList)

const tagColors = {
  '地形': '#22c55e',
  '后处理': '#8b5cf6',
  '粒子': '#f59e0b',
  '实体': '#3b82f6',
  '3dtile': '#ef4444',
  'DrawCommand': '#ec4899',
  'fbo': '#06b6d4',
}

async function showDemo(item) {
  router.push(item.compName)
  if (!item.compName){
    ElMessage.info('功能开发中！')
    return
  }
}

</script>

<template>
  <el-scrollbar class="scroll-wrap">
    <div class="gallery">
      <div
        class="card"
        v-for="item in puBuLiuData"
        :key="item.compName"
        @click="showDemo(item)"
      >
        <div class="card-media">
          <video
            v-if="item.imgUrl.includes('mp4')"
            :src="getAssetsFile(item.imgUrl)"
            autoplay muted loop playsinline
          />
          <img v-else :src="getAssetsFile(item.imgUrl)" alt="" />
          <div class="card-tag-row">
            <span
              v-for="tag in item.tag"
              :key="tag"
              class="tag-badge"
              :style="{ background: tagColors[tag] || '#475569' }"
            >{{ tag }}</span>
          </div>
          <div class="card-title-bar">
            <span class="card-title">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.scroll-wrap {
  height: 100%;
}

.gallery {
  column-count: 4;
  column-gap: 16px;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
}

.card {
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1e2b;
  border: 1px solid #2a2e3a;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #4fc3f7;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  }
}

.card-media {
  position: relative;
  line-height: 0;

  video,
  img {
    width: 100%;
    display: block;
  }
}

.card-tag-row {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tag-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  line-height: 18px;
}

.card-title-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 12px 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, transparent 100%);
}

.card-title {
  color: #e2e8f0;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
}

@media (max-width: 1200px) {
  .gallery { column-count: 3; }
}

@media (max-width: 860px) {
  .gallery { column-count: 2; column-gap: 10px; padding: 12px; }
  .card { margin-bottom: 10px; }
}

@media (max-width: 540px) {
  .gallery { column-count: 1; }
}
</style>
