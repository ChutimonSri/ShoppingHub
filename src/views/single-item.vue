<template>
  <div
    class="single-item"
    :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']"
  >
    <div class="container">
      <div class="item">
        <div class="item-image">
          <img :src="theItem.image" alt="item image" />
        </div>
        <div class="item-details">
          <base-title>{{ theItem.name }}</base-title>
          <p class="cat">{{ theItem.catigory }}</p>
          <base-badge class="item-price"
            >price: $ {{ theItem.price }}</base-badge
          >
          <div class="desc">{{ theItem.descreption }}</div>
          <div class="addtocart">
            <base-button @click="addToCart(theItem)" mode="green"
              >add to cart</base-button
            >
          </div>
        </div>
      </div>
      <!-- <div class="related-items">related</div> -->
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";

import { reactive, ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const itemId = ref(route.params.id);
    let theItem = computed(() => {
      new Promise((resolve) => {
        if (!store.getters.getTheItem.id) {
          router.push("/");
        }
      });
      return store.getters.getTheItem;
    });

    const addToCart = (item) => {
      store.dispatch("addToCart", item);
    };

    store.dispatch("getSingleItem", itemId.value);
    return { theItem, itemId, addToCart };
  },
  watch: {
    id(newValue) {
      if (!!newValue) {
        this.$store.dispatch("getSingleItem", this.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.single-item {
  margin-top: 60px;
  width: 100%;
  min-height: 100vh;
  .container {
    padding: 30px 10px;
    .item {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      width: 100%;
      .item-image {
        text-align: center;
        img {
          width: 100%;
          height: 100%;
          max-width: 350px;
          max-height: 350px;
        }
      }
      .item-details {
        padding: 20px 10px 0;
        h3.title {
          color: var(--main-color);
          font-size: 30px;
          margin: 0;
          padding: 0;
        }
        .cat {
          margin-top: 10px;
          font-weight: bold;
          color: inherit;
        }
        .item-price {
          color: red;
          font-size: 14px;
          font-weight: bold;
          margin: 5px 0;
        }
        .desc {
          color: inherit;
          line-height: 1.6;
          letter-spacing: 1.2px;
          font-size: 17px;
          text-transform: lowercase;
        }
        .addtocart {
          padding: 20px 0;
        }
      }
    }
  }
}
</style>
