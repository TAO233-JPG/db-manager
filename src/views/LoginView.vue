<template>
  <div class="login">
    <div class="pane">
      <div class="login-pane">
        <h2>后台管理系统</h2>
        <div>
          <el-form
            ref="ruleFormRef"
            :model="loginForm"
            :rules="rules"
            label-width="100px"
            size="large"
            label-position="top"
            class="loginForm"
            status-icon
          >
            <el-form-item label="用户名" prop="name">
              <el-input
                :prefix-icon="UserFilled"
                v-model="loginForm.username"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                :prefix-icon="Avatar"
                v-model="loginForm.password"
                type="password"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="login(ruleFormRef)"
                auto-insert-space
                style="flex: 1"
                >登录</el-button
              >
              <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="decorative-panel">
        <div class="circle"></div>
        <div class="mask"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus/es/components";
import type { FormRules } from "element-plus/es/tokens/form";
import { UserFilled, Avatar } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";

const ruleFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: "admin",
  password: "",
});
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 8, message: "密码长度在4-8之间", trigger: "blur" },
  ],
});

const userStore = useUserStore();
const router = useRouter();
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log(formEl);
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");
      console.log(loginForm.username, loginForm.password, { ...loginForm });
      try {
        await userStore.login(loginForm.username, loginForm.password);
        router.push("/home");
      } catch (error) {
        ElMessage.error("登录失败");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url("@/assets/images/login-bg.png");
  background-color: #588dca;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;

  .pane {
    width: 800px;
    height: 500px;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(242, 242, 242, 0.6);
    box-shadow: 0px 6.7px 5.3px rgba(0, 0, 0, 0.032),
      0px 22.3px 17.9px rgba(0, 0, 0, 0.044), 0px 100px 80px rgba(0, 0, 0, 0.07);

    backdrop-filter: blur(12px);
    border-radius: 20px;
    overflow: hidden;

    .login-pane {
      flex: 1;
      padding-top: 10%;
      h2 {
        text-align: center;
        // color: #fff;
        color: #444;
        // color: #409eff;
      }

      .loginForm {
        margin-top: 30px;
        padding: 0 20px;
      }
    }
    .decorative-panel {
      width: 50%;
      background-color: rgba(243, 245, 249, 0.4);
      // background-color: #f3f5f9;
      position: relative;
      .circle {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: #409eff;
      }

      .mask {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50%;
        background-color: rgb(194 205 211 / 30%);
        // background-color: rgba(243, 245, 249, .1);

        backdrop-filter: blur(18px);
        // border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  // .login-pane {
  //   box-sizing: border-box;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   width: 500px;
  //   height: 400px;
  //   padding: 20px;
  //   background: rgba(242, 242, 242, 0.5);
  //   border-radius: 40px;
  //   box-shadow: 0px 6px 6px 0px #5e7fa5;

  //   h2 {
  //     text-align: center;
  //     color: #fff;
  //   }

  //   .loginForm {
  //     margin-top: 30px;
  //     padding: 0 20px;
  //   }
  // }
}
</style>
