<template>
  <header>
    <h1>后台管理系统</h1>
    <ul class="user-detail">
      <li class="user-name">
        <el-avatar
          v-if="userStore.isLogin"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        >
        </el-avatar>
        <span>{{ userStore.name }}</span>
      </li>
      <li v-if="userStore.isLogin">个人中心</li>
      <li v-if="userStore.isLogin">退出登录</li>
    </ul>
  </header>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  height: 100%;
  color: #eee;
  box-sizing: border-box;
  h1 {
    padding-left: 50px;
  }
  ul.user-detail {
    display: flex;
    align-items: center;

    .user-name {
      display: flex;
      align-items: center;

      span {
        padding-left: 4px;
      }
    }

    li {
      padding: 0 8px;
      cursor: pointer;
    }
  }
}
</style>
