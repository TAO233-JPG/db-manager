<script setup lang="ts">
import { get_list } from "./api";
// import { RouterLink, RouterView } from "vue-router";
import NavMenu from "./components/nav/NavMenu.component.vue";
import HeaderContainer from "./components/header/HeaderContainer.component.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <HeaderContainer></HeaderContainer>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-main>Main </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  height: 100%;
  .header {
    background-color: #588dca;
    color: #fff;
  }
  .el-container {
    flex: 1;
    height: 100%;
  }
}
</style>
