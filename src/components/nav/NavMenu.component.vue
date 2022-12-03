<template>
  <!--  切换 菜单 -->
  <div
    class="switch-menu-btn"
    @click="
      () => {
        isCollapse = !isCollapse;
      }
    "
  >
    <el-icon v-if="isCollapse" size="28" color="#fff"><Expand /></el-icon>
    <el-icon v-else size="28" color="#fff"><Fold /></el-icon>
  </div>
  <el-menu
    default-active="2"
    class="nav-menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    text-color="#f0f049"
  >
    <el-menu-item index="1" @click="a">
      <el-icon><icon-menu /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><document /></el-icon>
      <template #title>汽车厂家管理</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><setting /></el-icon>
      <template #title>客户信息管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>汽车信息管理</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <template #title>汽车库存管理</template>
    </el-menu-item>
    <el-menu-item index="6">
      <el-icon><setting /></el-icon>
      <template #title>汽车销售管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Expand,
  Fold,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log("handleOpen", key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const a = (a: any) => {
  console.log("aaa", a.target);
};
</script>

<style scoped>
.switch-menu-btn {
  position: fixed;
  top: 17px;
  left: 19px;
  cursor: pointer;
  /* z-index: 999; */
}
.nav-menu {
  height: 100%;
}
.nav-menu:not(.el-menu--collapse) {
  width: 240px;
  height: 100%;
}
</style>
