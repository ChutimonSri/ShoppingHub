import { createStore } from "vuex";
import authModule from "./auth/auth";
import cartModule from "./cart/cart";
import lovesModule from "./loves/loves";
import ordersModule from "@/store/orders/orders";

import { db } from "@/firebase/firebase";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";

export default createStore({
  modules: {
    auth: authModule,
    cartModule,
    lovesModule,
    ordersModule,
  },
  state: {
    theItem: {},
    theme: "",
  },
  mutations: {
    setTheItem(state, paylaod) {
      state.theItem = paylaod;
    },
    setTheme(state, paylaod) {
      state.theme = paylaod;
    },
  },
  actions: {
    theme_action(context, paylaod) {
      localStorage.setItem("theme", paylaod);
      const theme = localStorage.getItem("theme");
      context.commit("setTheme", theme);
    },

    getSingleItem(context, paylaod) {
      const itemRef = doc(db, "items", paylaod);
      onSnapshot(itemRef, (Response) => {
        context.commit("setTheItem", { ...Response.data(), id: Response.id });
      });
    },

    // addToOrders(context, paylaod) {
    //   const userRef = doc(db, "users", context.getters.getUserId);
    //   const currentOrders = context.getters.getUserorders;
    //   const newOrders = [];
    //   paylaod.forEach((order) => {
    //     const id = order.id;
    //     const itemRef = doc(db, "items", id);
    //     let currentItemAmmount = null;
    //     let currentSells = null;

    //     getDoc(itemRef).then(async (res) => {
    //       currentItemAmmount = (await res.data().ammount) - order.quantity;
    //       currentSells = res.data().numberOfSells + order.quantity;
    //       console.log(currentSells);

    //       updateDoc(itemRef, {
    //         ammount: currentItemAmmount,
    //         numberOfSells: currentSells,
    //       });
    //     });

    //     newOrders.push({
    //       id: order.id,
    //       name: order.name,
    //       catigory: order.catigory,
    //       price: order.price,
    //       sale: order.sale,
    //       quantity: order.quantity,
    //       image: order.image,
    //     });
    //   });
    //   updateDoc(userRef, {
    //     orders: [...currentOrders, ...newOrders],
    //   });
    //   context.dispatch("updateCart", []);
    // },
  },
  getters: {
    getTheItem(state) {
      return state.theItem;
    },
    getTheme(state) {
      return state.theme;
    },
  },
});
