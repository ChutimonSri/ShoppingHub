import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default {
  state: {
    showLoves: false,
  },
  mutations: {
    setShowLoves(state) {
      state.showLoves = !state.showLoves;
    },
    closeLoves(state) {
      state.showLoves = false;
    },
  },
  actions: {
    addToLoves(context, paylaod) {
      const currentLoves = context.getters.getUserLoves.sort();
      const userRef = doc(db, "users", context.getters.getUserId);
      const found = currentLoves.find((item) => item === paylaod.id);
      console.log(found);
      if (!!found) {
        const ind = currentLoves.indexOf(found);
        console.log(ind);
        currentLoves.splice(ind, 1);
        console.log(currentLoves);
        updateDoc(userRef, {
          loves: [...currentLoves],
        });
      } else {
        updateDoc(userRef, {
          loves: [...currentLoves, paylaod.id],
        });
      }
    },

    deleteFromLoves(context, paylaod) {
      const newLoves = [];
      paylaod.forEach((item) => {
        newLoves.push(item.id);
      });
      const docRef = doc(db, "users", context.getters.getUserId);
      updateDoc(docRef, {
        loves: [...newLoves],
      });
    },
  },
  getters: {
    getShowLoves(state) {
      return !!state.showLoves;
    },
  },
};
