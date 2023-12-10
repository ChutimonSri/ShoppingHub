<template>
  <div class="card" :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']">
    <router-link :to="{ name: 'singleItem', params: { id: `${item.id}` } }">
      <div v-if="item.sale > 0 && item.ammount > 0" class="padje sale">
        {{ item.sale }} $
      </div>
      <div v-if="!item.ammount" class="padje">out of stock</div>
      <img :src="item.image" alt="" />
      <p class="title">{{ item.name }}</p>
      <p class="cat">{{ item.catigory }}</p>
    </router-link>
    <div class="rate">
      rate
      <span v-for="(star, i) in rate" :key="i">
        <i class="fa-solid fa-star"></i>
      </span>
    </div>
    <div class="action">
      <div v-if="item.sale">
        <small :style="{ 'text-decoration': 'line-through' }">
          {{ item.price }} $
        </small>
        <small class="saled-price">{{ item.price - item.sale }} $</small>
      </div>
      <small v-else>{{ item.price }} $</small>
      <base-button class="cart" mode="transparent" @click.stop="addToCart(item)"
        ><i class="fa-solid fa-cart-arrow-down"></i
      ></base-button>
    </div>
    <base-button
      class="love"
      :class="[love ? 'loved' : '']"
      mode="green"
      @click="addToLoLoves(item)"
    >
      <i class="fa-regular fa-heart"></i>
    </base-button>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      love: false,
    };
  },
  computed: {
    rate() {
      return Math.floor(Math.random() * 5);
    },
    getUserIsLoged() {
      return this.$store.getters.getIsLoged;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  methods: {
    addToCart(item) {
      if (this.getUserIsLoged) {
        this.$store.dispatch("addToCart", item);
      } else {
        this.$router.push("/auth");
      }
    },
    addToLoLoves(item) {
      if (this.getUserIsLoged) {
        this.$store.dispatch("addToLoves", item);
        this.love = !this.love;
      } else {
        this.$router.push("/auth");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.featured {
  text-align: center !important;
}
.loved {
  background-color: #ff00c8;
}

.card {
  position: relative;
  overflow: hidden;
  .love {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding: 0;
    font-size: 18px;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    .love {
      top: 10px;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    position: relative;
    width: 100%;
    height: auto;
    display: block;
    padding-top: 10px;
    .padje {
      position: absolute;
      top: 0;
      left: 0;
      width: fit-content;
      background-color: red;
      color: #fff;
      padding: 1px 10px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: bold;
      &.sale {
        background-color: #ffd900;
        color: var(--primary-color);
      }
    }
    img {
      width: 130px;
      height: 130px;
      border-radius: 5px;
    }
    .title {
      margin: 10px auto 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-weight: bold;
      color: var(--main-color);
      font-size: 16px;
      // width: 70%;
    }
    .cat {
      margin: 5px 0;
      font-weight: bolder;
      font-size: 14px;
    }
  }
  .rate {
    span {
      color: #fad400;
      font-size: 16px;
    }
  }
  .action {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    small {
      font-weight: bold;
      color: var(--danger-color);
      font-size: 15px;
    }
    .saled-price {
      font-size: 15px;
      color: var(--main-color);
      margin-left: 5px;
    }
    .cart {
      font-size: 20px;
    }
  }

  border: 1px solid #bebebe;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  transition: all 0.2s ease-in;
  overflow: hidden;
  &:hover {
    box-shadow: var(--shadow);
    border: 1px solid var(--main-color);
    .title {
      color: var(--main-color);
    }
  }
}
</style>
