import { db } from "../../firebase/firebase";
import { doc, updateDoc, onSnapshot, collection } from "firebase/firestore";

export default {
  state: {
    showPopup: false,
    showCart: false,
    allItems: [],
  },
  mutations: {
    setShowPopup(state, paylaod) {
      state.showPopup = paylaod;
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
    setAllItems(state, paylaod) {
      state.allItems = paylaod;
    },
  },
  actions: {
    addToCart(context, paylaod) {
      if (paylaod.ammount > 0) {
        const currentCart = context.getters.getUserCart.sort();
        const userRef = doc(db, "users", context.getters.getUserId);
        const found = currentCart.find((item) => item.item === paylaod.id);
        if (!!found) {
          context.commit("setShowPopup", true);
        } else {
          updateDoc(userRef, {
            cart: [...currentCart, { item: paylaod.id, quantity: 1 }],
          });
        }
      }
    },

    updateCart(context, paylaod) {
      const newCart = [];
      paylaod.forEach((item) => {
        newCart.push({ item: item.id, quantity: item.quantity });
      });
      // console.log(newCart);
      const docRef = doc(db, "users", context.getters.getUserId);
      updateDoc(docRef, {
        cart: [...newCart],
      });
    },

    async fetchAllItems(context) {
      const itemsRef = collection(db, "items");
      onSnapshot(itemsRef, (Response) => {
        const items = [];
        Response.docs.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
        context.commit("setAllItems", items);
      });
    },
  },
  getters: {
    getShowPopup(state) {
      return !!state.showPopup;
    },
    getShowCart(state) {
      return !!state.showCart;
    },
    getAllItems(state) {
      return state.allItems;
    },
  },
};
