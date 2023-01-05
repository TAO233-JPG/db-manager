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
    class="nav-menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
    text-color="#fff"
    :default-active="router.currentRoute.value.fullPath"
    background-color="#43658b"
  >
    <template v-for="item of operationRoutes">
      <template v-if="item.meta.show">
        <el-menu-item :key="item.path" :index="item.path">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </template>
      <template v-else>
        <el-menu-item :key="item.path" :index="item.path" disabled>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </template>
    </template>
    <!-- <el-menu-item
      v-for="item of operationRoutes"
      :key="item.path"
      :index="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item> -->

    <!-- <el-sub-menu index="3">
      <template #title>
        <el-icon><location /></el-icon>
        <span>管理</span>
      </template>
      <el-menu-item index="test">管理1</el-menu-item>
      <el-menu-item index="test2">管理two</el-menu-item>
    </el-sub-menu> -->
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();
// router.addRoute("home", {
//   name: "addrouete",
//   path: "addrouete",
//   component: ABVue,
//   meta: {
//     icon: "Setting",
//     show: true,
//     title: "added route",
//   },
// });

console.log(1111, router.getRoutes(), 99);
const operationRoutes = computed(() => {
  return router.getRoutes().filter((route) => {
    const path = route.path;
    return /^\/home\//.test(path);
  });
});

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log("handleOpen", key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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
