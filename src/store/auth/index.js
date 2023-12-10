import { auth, storage, db } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default {
  state: {
    user: {},
    userData: {},
  },
  mutations: {
    setUser(state, paylaod) {
      state.user = paylaod;
    },
    setUserData(state, paylaod) {
      state.userData = paylaod;
    },
  },

  actions: {
    async createUser(context, paylaod) {
      await createUserWithEmailAndPassword(
        auth,
        paylaod.email,
        paylaod.password
      ).then((user) => {
        context.commit("setUser", user.user);
        context.dispatch("uploadImage", { ...paylaod, userId: user.user.uid });
      });
    },

    async uploadImage(context, paylaod) {
      const imageRef = ref(storage, `usersImaged/${paylaod.userId}`);
      await uploadBytes(imageRef, paylaod.image).then((snapshot) => {
        console.log(snapshot);
        getDownloadURL(imageRef).then((url) => {
          context.dispatch("addUser", { ...paylaod, url });
        });
      });
    },

    async addUser(_, paylaod) {
      const userRef = doc(db, "users", paylaod.userId);
      await setDoc(userRef, {
        firstName: paylaod.firstName,
        lastName: paylaod.lastName,
        email: paylaod.email,
        imageUrl: paylaod.url,
        cart: [],
        loves: [],
        orders: [],
        role: "user",
      }).then(() => {
        console.log("user added");
      });
    },

    async signIn(context, paylaod) {
      await signInWithEmailAndPassword(
        auth,
        paylaod.email,
        paylaod.password
      ).then((user) => {
        context.commit("setUser", user.user);
      });
    },

    async getCurrentUser(context, paylaod) {
      const userRef = doc(db, "users", paylaod.uid);
      await onSnapshot(userRef, async (user) => {
        await context.commit("setUserData", user.data());
        console.log(user.data().imageUrl);
        console.log(context.state.userData.imageUrl);
      });
    },

    async logOut(context) {
      await signOut(auth).then(() => {
        context.commit("setUser", null);
      });
    },
  },
  getters: {
    getUserData(state) {
      return state.userData;
    },
    getFirstName(state) {
      return state.userData.firstName;
    },
    getImageUrl(state) {
      return state.userData.imageUrl;
    },
    getLastName(state) {
      return state.userData.lastName;
    },
    getUserId(state) {
      return state.userData.userId;
    },
    getIsLoged(state) {
      return !!state.user;
    },
    getUserRole(state) {
      return state.userData.role;
    },
  },
};
