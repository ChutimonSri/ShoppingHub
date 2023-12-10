<template>
  <baseSideBar @toggle="toggleLoves" :show="showLoves" :items="getUserLoves">
    <template #header>
      <base-title>my favourites</base-title>
    </template>
    <template #table>
      <table class="table">
        <tbody>
          <tr v-for="(item, index) in lovesItems" :key="index">
            <th class="index">{{ index + 1 }}</th>
            <td class="item-image"><img :src="item.image" alt="" /></td>
            <td class="item-name">{{ item.name }}</td>
            <td class="item-price">{{ item.price }} $</td>
            <td class="action">
              <router-link
                :to="{ name: 'singleItem', params: { id: `${item.id}` } }"
              >
                <base-button class="prevwe" mode="transparent">
                  <i class="fa-regular fa-eye"></i>
                </base-button>
              </router-link>
              <base-button
                class="add"
                @click="addToCart(item)"
                mode="transparent"
              >
                <i class="fa-solid fa-cart-arrow-down"></i>
              </base-button>
              <base-button
                @click="deletItemFromLoves(index)"
                class="remove"
                mode="transparent"
              >
                <i class="fa-regular fa-trash-can"></i>
              </base-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #noItem>no items !!</template>
  </baseSideBar>
</template>

<script>
import { db } from "../firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
export default {
  data() {
    return {
      lovesItems: [],
      allItems: [],
    };
  },
  computed: {
    showLoves() {
      return this.$store.getters.getShowLoves;
    },
    getUserLoves() {
      return this.$store.getters.getUserLoves;
    },
  },
  methods: {
    toggleLoves() {
      this.$store.commit("setShowLoves");
    },
    addToCart(item) {
      this.$store.dispatch("addToCart", item);
    },
    getAllItems() {
      this.lovesItems = [];
      const itemRef = collection(db, "items");
      onSnapshot(itemRef, (Response) => {
        const items = [];
        Response.docs.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
        this.allItems = items;
      });
    },
    getLovesItems() {
      this.lovesItems = [];
      this.getUserLoves.forEach((itemInLoves) => {
        this.allItems.forEach((item) => {
          if (itemInLoves === item.id) {
            this.lovesItems.push({ ...item });
            return false;
          }
        });
      });
    },
    deletItemFromLoves(itemIndex) {
      this.lovesItems.splice(itemIndex, 1);
      this.$store.dispatch("deleteFromLoves", this.lovesItems);
    },
  },
  watch: {
    allItems(newValue, oldValue) {
      this.getLovesItems();
    },
    getUserLoves(newValue, oldValue) {
      this.getLovesItems();
    },
  },
  created() {
    this.getAllItems();
    this.getLovesItems();
  },
};
</script>

<style lang="scss" scoped>
h3.title {
  color: var(--main-color);
  padding: 0;
  margin: 0;
  font-size: 20px;
  width: 100%;
  text-align: center;
}
</style>
