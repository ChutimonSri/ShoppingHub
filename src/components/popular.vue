<template>
  <div
    class="popular"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <div class="container">
      <base-title>best seller</base-title>
      <div class="cats-container">
        <item v-for="item in popularItems" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import item from "@/components/item";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
export default {
  components: {
    item,
  },
  data() {
    return {
      popularItems: [],
    };
  },
  methods: {
    getPopularItems() {
      const itemRef = collection(db, "items");
      onSnapshot(itemRef, (Response) => {
        const items = [];
        Response.docs.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
        this.popularItems = items
          .sort(
            (firstItem, secondItem) =>
              firstItem.numberOfSells - secondItem.numberOfSells
          )
          .reverse()
          .filter((item) => {
            return item.numberOfSells > 10;
          });
      });
    },
    closePopup() {
      this.$store.commit("setShowPopup", false);
    },
    toggleCart() {
      this.$store.commit("setShowCart");
      this.$store.commit("setShowPopup", false);
      this.$store.commit("setShowLoves");
    },
  },
  created() {
    this.getPopularItems();
  },
  computed: {
    showPopup() {
      return this.$store.getters.getShowPopup;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.popular {
  padding: 40px 0;
  width: 100%;
  .container {
    .cats-container {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      @media (max-width: 500px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
  }
}
</style>
