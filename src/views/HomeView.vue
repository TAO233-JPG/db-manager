<template>
  <el-container>
    <el-header class="header">
      <header-container></header-container>
    </el-header>
    <el-container>
      <el-aside>
        <nav-menu></nav-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import HeaderContainer from "@/components/header/HeaderContainer.component.vue";
import NavMenu from "@/components/nav/NavMenu.component.vue";
import { onBeforeUnmount } from "vue";

onBeforeUnmount(() => {
  console.log("homeView unmounted");
});
</script>
<style scoped lang="scss">
.header {
  background-color: #588dca;
  color: #fff;
}
.el-container {
  flex: 1;
  height: 100%;

  .el-aside {
    width: auto;
  }
}
</style>
