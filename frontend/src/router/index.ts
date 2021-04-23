import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/createuser",
  //   name: "CreateUser",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/CreateUser.vue"),
  // },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/test",
    name: "test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
