import ABVue from "@/components/AB.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "NotFound",
    //   component: () => import("../views/TestView.vue"),
    // },
    // { path: "/user-:afterUser(.*)", component: ABVue },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  ],
});

router.beforeEach((to, from) => {
  console.log("to", to);
  console.log("from", from);
  console.log("router", router.getRoutes());
});

export default router;
