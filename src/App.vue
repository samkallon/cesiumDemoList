<script setup>
import tsParticleEmitter from "../public/tsParticle/tsParticleEmitter.json";
</script>

<template>
  <vue-particles id="bg" :options="tsParticleEmitter"></vue-particles>
  <div class="header">
    <div class="title" @click="router.push('/')">CESIUM示例</div>
    <el-link href="https://www.samkallon.top" type="primary" style="margin-right: 8px">博客</el-link>
    <el-link href="https://www.samkallon.top/three-demo-list" type="primary" style="margin-right: 8px">ThreeDemo
    </el-link>
  </div>
  <div class="con">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  background: #213547;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;

  .title {
    color: white;
    font-size: 32px;
    margin-left: 24px;
    flex-grow: 2;
    cursor: pointer;
  }
}

.con {
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 60px;
}

</style>
