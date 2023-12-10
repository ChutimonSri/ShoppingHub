import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import about from "../views/AboutView.vue";
import login from "../views/login.vue";
import singleItem from "@/views/single-item";
import products from "@/views/products";
import profile from "@/views/profile";
import orders from "@/views/orders";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/auth",
    name: "auth",
    component: login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/product-details/:id",
    name: "singleItem",
    component: singleItem,
    props: true,
  },
  {
    path: "/products",
    name: "products",
    component: products,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    meta: {
      auth: true,
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: orders,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.meta.auth && !store.getters.getIsLoged) {
    // console.log(1);
    next("/auth");
  }  else if (to.meta.auth === false && store.getters.getIsLoged) {
    // console.log(3);
    next("/");
  } else {
    // console.log(4);
    next();
  }
});
export default router;
