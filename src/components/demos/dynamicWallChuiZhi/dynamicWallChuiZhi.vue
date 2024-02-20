<script setup>
import {onMounted, ref} from "vue";
import {addWallGeojson, initViewer} from "@/utils/cesiumUtils.js";

let viewer = null
onMounted(() => {
  viewer = initViewer('cesiumContainer')
  addWallGeojson({
    wallList: [[
      {
        "x": -133197.33265570537,
        "y": -4926384.199082031,
        "z": 4035328.5546499547
      },
      {
        "x": -171260.47851050113,
        "y": -4960058.658651821,
        "z": 3992701.4112747586
      },
      {
        "x": -75647.79739509827,
        "y": -4976743.420111386,
        "z": 3974975.413831942
      },
      {
        "x": -58289.114857055305,
        "y": -4943130.989436044,
        "z": 4016709.3028227384
      }
    ]],
    maximumHeights: 20000,
    minimumHeights: 0,
    viewer
  })
})

</script>

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>

</template>

<style scoped lang="scss">
.container {
  width: 100%;
  position: relative;
}

#cesiumContainer {
  width: 100%;
  height: 90vh;
}
</style>