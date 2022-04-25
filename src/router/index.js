import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Newspaper.io | Breaking News" },
  },
  {
    path: "/:category/:page",
    name: "News",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/news-paper/:id",
    name: "Newspaper",
    component: () => import("../views/Newspaper.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/SearchPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
