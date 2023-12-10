import { auth, db, storage } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default {
  state: {
    userId: "",
    token: "",
    isLoged: false,
    expireIn: "",
    firstName: "",
    lastName: "",
    imageUrl: "",
    email: "",
    userRole: "",
    cart: [],
    loves: [],
    orders: [],
  },

  mutations: {
    setUser(state, paylaod) {
      (state.userId = paylaod.userId),
        (state.token = paylaod.token),
        (state.isLoged = paylaod.userId && paylaod.token ? true : false);
    },

    setUserData(state, paylaod) {
      state.firstName = paylaod.firstName;
      state.lastName = paylaod.lastName;
      state.imageUrl = paylaod.imageUrl;
      state.email = paylaod.email;
      state.userRole = paylaod.role;
      (state.cart = paylaod.cart),
        (state.loves = paylaod.loves),
        (state.orders = paylaod.orders);
    },
    setUserImage(state, paylaod) {
      state.imageUrl = paylaod;
    },
  },

  actions: {
    async uploadFile(context, paylaod) {
      if (paylaod.image) {
        const storageRef = ref(storage, `users/${paylaod.userId}`);
        await uploadBytes(storageRef, paylaod.image).then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            await context.dispatch("addUser", { ...paylaod, url });
          });
        });
      } else {
        const url =
          "https://firebasestorage.googleapis.com/v0/b/e-commerce-6eb22.appspot.com/o/users%2Fuseravatar.png?alt=media&token=5a3793d9-bfbd-402d-a587-7b23cfa41afa";
        await context.dispatch("addUser", { ...paylaod, url });
      }
    },

    async addUser(context, paylaod) {
      const docRef = doc(db, "users", `${paylaod.userId}`);
      await setDoc(docRef, {
        firstName: paylaod.firstName,
        lastName: paylaod.lastName,
        email: paylaod.email,
        imageUrl: paylaod.url,
        cart: [],
        loves: [],
        orders: [],
        role: "user",
      })
        .then(async () => {
          localStorage.setItem("userId", paylaod.userId);
          localStorage.setItem("token", paylaod.token);
          await context.commit("setUser", paylaod);
          await context.commit("setUserData", {
            firstName: paylaod.firstName,
            lastName: paylaod.lastName,
            imageUrl: paylaod.url,
            email: paylaod.email,
            role: "user",
            cart: [],
            loves: [],
            orders: [],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async autoLogin(context) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (token && userId) {
        await context.commit("setUser", { userId, token });
        const userRef = doc(db, "users", userId);
        onSnapshot(userRef, (user) => {
          const userData = { ...user.data(), id: user.id };
          // console.log(userData)
          context.commit("setUserData", userData);
        });
      }
    },

    async signIn(context, paylaod) {
      await signInWithEmailAndPassword(auth, paylaod.email, paylaod.password)
        .then(async (user) => {
          localStorage.setItem("userId", user.user.uid);
          localStorage.setItem("token", user.user.accessToken);
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          context.commit("setUser", { token, userId });
          const userRef = doc(db, "users", userId);
          onSnapshot(userRef, (user) => {
            const userData = { ...user.data(), id: user.id };
            context.commit("setUserData", userData);
          });
        })
        .catch((err) => {
          throw err;
        });
    },

    logOut(context) {
      signOut(auth).then(() => {
        console.log("out");
      });
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      context.commit("setUser", { userId: "", token: "" });
      context.commit("setUserData", {
        firstName: "",
        lastName: "",
        imageUrl: "",
        email: "",
        role: "",
        cart: [],
        loves: [],
        orders: [],
      });
    },

    async createUser(context, paylaod) {
      await createUserWithEmailAndPassword(
        auth,
        paylaod.email,
        paylaod.password
      )
        .then(async (user) => {
          const token = user.user.accessToken;

          await context.dispatch("uploadFile", {
            userId: user.user.uid,
            firstName: paylaod.firstName,
            lastName: paylaod.lastName,
            email: paylaod.email,
            // fileName: paylaod.fileName,
            image: paylaod.image,
            token,
          });
        })
        .catch((err) => {
          throw err;
        });
    },
  },

  getters: {
    getImageUrl(state) {
      return state.imageUrl;
    },
    getFirstName(state) {
      return state.firstName;
    },
    getLastName(state) {
      return state.lastName;
    },
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
      return state.token;
    },
    getIsLoged(state) {
      return state.isLoged;
    },
    getUserRole(state) {
      return state.userRole;
    },
    getUserCart(state) {
      return state.cart;
    },
    getUserLoves(state) {
      return state.loves;
    },
    getUserorders(state) {
      return state.orders;
    },
  },
};
