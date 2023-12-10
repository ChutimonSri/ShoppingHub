<template>
  <baseSideBar @toggle="toggleCart" :show="showCart" :items="getUserCart">
    <template #header>
      <base-title>my cart</base-title>
      <div class="total-price">
        total price:
        <span>{{ totalPrice }} $</span>
      </div>
    </template>
    <template #table>
      <table v-if="!!getUserCart.length" class="table">
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <th class="index">{{ index + 1 }}</th>
            <td class="item-image"><img :src="item.image" alt="" /></td>
            <td class="item-name">{{ item.name }}</td>
            <td class="quantity">
              <select v-model.number="item.quantity" @change="changeQuantity">
                <option v-for="num in item.ammount" :key="num">
                  {{ num }}
                </option>
              </select>
            </td>
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
                mode="transparent"
                class="remove"
                @click="deletItemFromCart(index)"
              >
                <i class="fa-regular fa-trash-can"></i>
              </base-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #noItem>your cart is empty !!</template>
    <template #actions>
      <div v-if="!!getUserCart.length" class="actions">
        <base-button @click="addToOrders" mode="green"
          >confirm this
          <span v-if="getUserCart.length > 1">orders</span>
          <span v-else>order</span>
        </base-button>
      </div>
    </template>
  </baseSideBar>
</template>

<script>
import { db } from "../firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
export default {
  data() {
    return {
      cartItems: [],
      allItems: [],
    };
  },
  computed: {
    showCart() {
      return this.$store.getters.getShowCart;
    },
    getUserCart() {
      return this.$store.getters.getUserCart;
    },
    totalPrice() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
  methods: {
    changeQuantity() {
      this.$store.dispatch("updateCart", this.cartItems);
    },
    toggleCart() {
      this.$store.commit("setShowCart");
    },
    getAllItems() {
      this.allItems = [];
      const itemRef = collection(db, "items");
      onSnapshot(itemRef, (Response) => {
        const items = [];
        Response.docs.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
        this.allItems = items;
      });
    },
    getCartItems() {
      this.cartItems = [];
      this.getUserCart.forEach((itemInCart) => {
        this.allItems.forEach((item) => {
          if (itemInCart.item === item.id) {
            this.cartItems.push({ ...item, quantity: itemInCart.quantity });
            return false;
          }
        });
      });
    },
    addToOrders() {
      this.$store.dispatch("addToOrders", this.cartItems);
    },
    deletItemFromCart(itemIndex) {
      this.cartItems.splice(itemIndex, 1);
      this.$store.dispatch("updateCart", this.cartItems);
    },

    // addToOrders() {
    //   console.log(this.$store.getters.getUserCart);
    // },
  },
  watch: {
    allItems(newValue, oldValue) {
      this.getCartItems();
    },
    getUserCart(newValue, oldValue) {
      this.getCartItems();
    },
  },
  created() {
    this.getAllItems();
    this.getCartItems();
  },
};
</script>

<style lang="scss" scoped>
h3.title {
  color: var(--main-color);
  padding: 0;
  margin: 0;
  font-size: 20px;
}
.total-price {
  font-weight: 600;
  color: var(--primary-color);
  text-transform: lowercase;
  span {
    font-weight: bold;
    color: var(--main-color);
  }
}
</style>
