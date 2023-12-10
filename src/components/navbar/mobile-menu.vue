<template>
  <div class="mobile-menu">
    <div @click="toggleNaveBar" class="menu">
      <i class="fa-solid fa-bars"></i>
    </div>

    <base-button mode="transparent" @click="toggleCart">
      <div class="number">
        <span v-if="getUserCartLength < 100">{{ getUserCartLength }}</span>
        <span v-else>+99</span>
      </div>
      <i class="fa-solid fa-cart-arrow-down"></i>
    </base-button>
    <base-button mode="transparent" @click="toggleLoves">
      <div class="number">
        <span v-if="getUserLovesLength < 100">{{ getUserLovesLength }}</span>
        <span v-else>+99</span>
      </div>
      <i class="fa-regular fa-heart"></i>
    </base-button>
    <theme />
  </div>
</template>

<script>
import theme from "@/components/theme/theme";
export default {
  components: {
    theme,
  },
  computed: {
    getUserCartLength() {
      return this.$store.getters.getUserCart.length;
    },
    getUserLovesLength() {
      return this.$store.getters.getUserLoves.length;
    },
  },
  methods: {
    toggleNaveBar() {
      this.$emit("toggleNaveBar");
    },
    toggleCart() {
      this.$store.commit("setShowCart");
    },
    toggleLoves() {
      this.$store.commit("setShowLoves");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  .number {
    position: absolute;
    width: fit-content;
    height: fit-content;
    padding: 3px 7px;
    background-color: var(--danger-color);
    border-radius: 200px;
    left: 18px;
    top: -9px;
    color: #fff;
    font-size: 9px;
    font-weight: bold;
    display: grid;
    place-items: center;
  }
}

.mobile-menu {
  color: var(--main-color);
  width: fit-content;
  height: 100%;
  display: none;
  .menu {
    font-size: 18px;
    cursor: pointer;
    margin-left: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: grid;
    place-items: center;
  }
  button {
    font-size: 20px;
    padding: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 5px;
    position: relative;
    .number {
      top: -8px;
      left: 21px;
    }
  }
  @media (max-width: 650px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
}
</style>
