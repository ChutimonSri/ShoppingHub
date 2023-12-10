<template>
  <nav
    class="navbar"
    :class="[getTheme === 'dark' ? 'nav-bg-dark' : 'nav-bg-light']"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }" class="logo">
        <i class="fa-solid fa-cart-arrow-down"></i>
        <p :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']">ShoppingHub</p>
      </router-link>

      <nav-bar-links
        @toggleUserInfo="toggleUserInfo"
        :show_user_info="show_user_info"
      />

      <mobile-menu @toggleNaveBar="toggleNaveBar" />
    </div>
  </nav>
  <transition name="mobile-nav" mode="out-in">
    <mobile-nav v-if="show_nav" @toggleNaveBar="toggleNaveBar" />
  </transition>
  <transition name="fade">
    <div @click="closeNav" v-if="show_nav" class="overlay"></div>
  </transition>
</template>

<script>
import baseButton from "../basics/base-button.vue";
import mobileNav from "@/components/navbar/mobile-nav.vue";
import mobileMenu from "@/components/navbar/mobile-menu";
import navBarLinks from "@/components/navbar/navBarLinks";
export default {
  components: {
    baseButton,
    mobileNav,
    mobileMenu,
    navBarLinks,
  },
  data() {
    return {
      show_nav: false,
      show_user_info: false,
    };
  },
  methods: {
    toggleNaveBar() {
      this.show_nav = !this.show_nav;
    },
    toggleUserInfo() {
      this.show_user_info = !this.show_user_info;
    },
    closeNav() {
      this.show_nav = false;
    },
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(250px);
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.overlay {
  display: none;
  z-index: 1001;
  position: fixed;
  top: 0;
  @media (max-width: 650px) {
    display: block;
  }
}
.navbar {
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100% !important;

    .logo {
      color: var(--main-color);
      font-size: 26px;
      display: flex;
      align-items: center;
      height: 100%;
      text-decoration: none;
      p {
        margin-left: 10px;
        font-weight: bold;
        display: inline-block;
        font-size: 30px;
        font-family: "La Belle Aurore", cursive;
      }
    }
  }
}
</style>
