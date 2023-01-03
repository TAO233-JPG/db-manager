import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { get_login_admin, get_login_distributor, get_login_staff } from "@/api";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const password = ref("");
  const isLogin = ref(false);

  const name = computed(() => {
    return isLogin.value ? username.value : "未登录";
  });

  const login = async (
    _username: string,
    _password: string,
    identity: string
  ) => {
    try {
      let result: any = "";

      if (identity === "管理员") {
        result = await get_login_admin({
          username: _username,
          password: _password,
        });
      } else if (identity === "经销商管理员") {
        result = await get_login_distributor({
          username: _username,
          password: _password,
        });
      } else if (identity === "销售人员") {
        result = await get_login_staff({
          username: _username,
          password: _password,
        });
      }
      username.value = _username;
      password.value = _password;
      isLogin.value = true;

      console.log(result, "login-result");
    } catch (error) {
      console.log(error);
      throw new Error("登录失败");
    }
  };

  return { name, isLogin, login };
});
