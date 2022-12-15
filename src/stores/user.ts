import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { post_login } from "@/api";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const password = ref("");
  const isLogin = ref(false);

  const name = computed(() => {
    return isLogin.value ? username.value : "未登录";
  });

  const login = async (_username: string, _password: string) => {
    try {
      const result = await post_login({
        username: _username,
        password: _password,
      });
      username.value = _username;
      password.value = _password;
      isLogin.value = true;

      console.log(result, "login-result");
    } catch (error) {
      console.log(error);
    }
  };

  return { name, isLogin, login };
});
