import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { get_login_admin, get_login_distributor, get_login_staff } from "@/api";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const password = ref("");
  const isLogin = ref(false);
  const identity1 = ref("111");
  const auth = ref(1);
  const name = computed(() => {
    return isLogin.value ? username.value : "未登录";
  });
  const user = ref<any>();
  const login = async (
    _username: string,
    _password: string,
    _identity: string
  ) => {
    try {
      let result: any = "";

      if (_identity === "管理员") {
        auth.value = 1;
        result = await get_login_admin({
          username: _username,
          password: _password,
        });
      } else if (_identity === "经销商管理员") {
        auth.value = 2;

        result = await get_login_distributor({
          username: _username,
          password: _password,
        });
      } else if (_identity === "销售人员") {
        auth.value = 3;

        result = await get_login_staff({
          username: _username,
          password: _password,
        });
      }
      username.value = _username;
      password.value = _password;
      identity1.value = _identity;
      isLogin.value = true;
      user.value = result;
      // console.log(result, "login-result");
    } catch (error) {
      console.log(error);
      throw new Error("登录失败");
    }
  };

  const logout = async () => {
    isLogin.value = false;
  };

  return { auth, name, isLogin, login, logout, identity1, user };
});
