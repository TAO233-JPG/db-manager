<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
