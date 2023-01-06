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
      children: [
        {
          path: "product",
          name: "product",
          component: () => import("../views/ProductView.vue"),
          meta: {
            icon: "Setting",
            title: "产品",
            show: ["管理员"],
          },
        },
        {
          path: "distributor",
          name: "distributor",
          component: () => import("../views/DistributorView.vue"),
          meta: {
            icon: "Document",
            title: "经销商管理",
            show: ["管理员"],
          },
        },
        {
          path: "brand",
          name: "brand",
          component: () => import("../views/BrandView.vue"),
          meta: {
            icon: "Document",
            title: "品牌管理",
            show: ["管理员"],
          },
        },
        {
          path: "model",
          name: "model",
          component: () => import("../views/ModelView.vue"),
          meta: {
            icon: "Document",
            title: "品牌模型管理",
            show: ["管理员"],
          },
        },
        {
          path: "option",
          name: "option",
          component: () => import("../views/OptionView.vue"),
          meta: {
            icon: "Document",
            title: "选项管理",
            show: ["管理员"],
          },
        },
        {
          path: "Inventory",
          name: "Inventory",
          component: () => import("../views/InventoryView.vue"),
          meta: {
            icon: "Document",
            title: "经销商库存管理",
            show: ["经销商管理员"],
          },
        },
        {
          path: "staff",
          name: "staff",
          component: () => import("../views/StaffView.vue"),
          meta: {
            icon: "Document",
            title: "经销商人员管理",
            show: ["经销商管理员"],
          },
        },
        {
          path: "order",
          name: "order",
          component: () => import("../views/OrderView.vue"),
          meta: {
            icon: "Document",
            title: "订单管理",
            show: ["经销商管理员", "销售人员"],
          },
        },

        // {
        //   path: "test3",
        //   name: "test3",
        //   component: () => import("../views/TestView2.vue"),
        //   meta: {
        //     icon: "Document",
        //     title: "禁用1",
        //     show: false,
        //   },
        // },
      ],
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
