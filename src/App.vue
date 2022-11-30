<script setup lang="ts">
import { get_list } from "./api";
import { RouterLink, RouterView } from "vue-router";
import NavMenu from "./components/nav/NavMenu.component.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="250px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-main>Main </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
