import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueCarousel from "vue-carousel";
import store from "./store";
import "./scss/main.scss";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import baseButton from "@/components/basics/base-button";
import baseBadge from "@/components/basics/base-badge";
import baseTitle from "@/components/basics/base-title";
import baseLoading from "@/components/basics/base-loading";
import popup from "@/components/basics/popup";
import cart from "./components/cart.vue";
import loves from "./components/loves.vue";
import baseSideBar from "@/components/base-side-bar";
import item from "@/components/item.vue";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.component("baseButton", baseButton);
    app.component("baseBadge", baseBadge);
    app.component("baseTitle", baseTitle);
    app.component("baseLoading", baseLoading);
    app.component("popup", popup);
    app.component("cart", cart);
    app.component("loves", loves);
    app.component("baseSideBar", baseSideBar);
    app.component("item", item);
    app.use(store);
    app.use(router);
    app.use(VueCarousel);
    app.mount("#app");
  }
});
