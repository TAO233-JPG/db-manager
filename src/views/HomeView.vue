<template>
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
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.header {
  background-color: #588dca;
  color: #fff;
}
.el-container {
  flex: 1;
  height: 100%;
}
</style>
