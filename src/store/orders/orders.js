import { db } from "@/firebase/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";

export default {
  state: {
    allOrders: [],
  },
  mutations: {
    setAllOrders(state, paylaod) {
      state.allOrders = paylaod;
    },
  },
  actions: {
    fetchAllOrders(context) {
      const ordersRef = collection(db, "orders");
      onSnapshot(ordersRef, (res) => {
        let orders = [];
        res.docs.forEach((item) => {
          orders.push({ ...item.data(), id: item.id });
        });
        context.commit("setAllOrders", orders);
      });
      // console.log(context.getters.getAllOrders);
    },

    addToOrders(context, paylaod) {
      const userRef = doc(db, "users", context.getters.getUserId);
      const currentOrders = context.getters.getUserorders;
      const newOrders = [];
      const ordersNumber =
        Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
      paylaod.forEach((order) => {
        const id = order.id;
        const itemRef = doc(db, "items", id);
        let currentItemAmmount = null;
        let currentSells = null;

        getDoc(itemRef).then(async (res) => {
          currentItemAmmount = (await res.data().ammount) - order.quantity;
          currentSells = res.data().numberOfSells + order.quantity;
          // console.log(currentSells);

          updateDoc(itemRef, {
            ammount: currentItemAmmount,
            numberOfSells: currentSells,
          });
        });

        newOrders.push({
          id: order.id,
          name: order.name,
          catigory: order.catigory,
          price: order.price,
          sale: order.sale,
          quantity: order.quantity,
          image: order.image,
          state: "in proccess",
          orderNumber: ordersNumber,
        });
       
      });
      updateDoc(userRef, {
        orders: [...currentOrders, ...newOrders],
      });
      const ordersRef = collection(db, "orders");
    
      context.dispatch("updateCart", []);
      context.dispatch("fetchAllOrders");
    },
  },
  getters: {
    getAllOrders(state) {
      return state.allOrders;
    },
  },
};
