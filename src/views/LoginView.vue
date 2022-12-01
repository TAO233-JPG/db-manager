<template>
  <div class="login">
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
            <el-input v-model="loginForm.name" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" />
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
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus/es/components";
import type { FormRules } from "element-plus/es/tokens/form";
import { reactive, ref } from "vue";

const ruleFormRef = ref<FormInstance>();
const loginForm = reactive({
  name: "Hello",
  password: "",
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 8, message: "密码长度在4-8之间", trigger: "blur" },
  ],
});

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log(formEl);
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      console.log(loginForm.name, loginForm.password, { ...loginForm });
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
  background-color: #588dca;
  position: relative;

  .login-pane {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 400px;
    padding: 20px;
    background: rgba(242, 242, 242, 0.5);
    border-radius: 40px;
    box-shadow: 0px 6px 6px 0px #5e7fa5;

    h2 {
      text-align: center;
      color: #fff;
    }

    .loginForm {
      margin-top: 30px;
      padding: 0 20px;
    }
  }
}
</style>
