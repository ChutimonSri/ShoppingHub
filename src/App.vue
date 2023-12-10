<template>
  <div id="app" :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']">
    <nav-bar />
    <cart />
    <loves />
    <router-view v-slot="{ Component }">
      <transition name="toute" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <footerComp v-if="show_footer" />
    <popup v-if="showPopup" @close="closePopup">
      this item already in your cart
      <base-button mode="link" @click="toggleCart"
        >check your cart
      </base-button>
    </popup>
  </div>
</template>

<script>
import footerComp from "@/components/footer";
import navBar from "@/components/navbar/navBar";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    navBar,
    footerComp,
  },
  data() {
    return {
      show_footer: true,
    };
  },
  methods: {
    closePopup() {
      this.$store.commit("setShowPopup", false);
    },
    toggleCart() {
      this.$store.commit("setShowCart");
      this.$store.commit("setShowPopup", false);
      this.$store.commit("closeLoves");
    },
  },
  computed: {
    showPopup() {
      return this.$store.getters.getShowPopup;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },

  created() {
    if (this.$route.path === "/auth") {
      this.show_footer = false;
    }
  },
  watch: {
    $route(newValue) {
      if (newValue.path === "/auth") {
        this.show_footer = false;
      } else {
        this.show_footer = true;
      }
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("autoLogin");
    store.dispatch("fetchAllItems");
    store.dispatch("fetchAllOrders");
    const theme = localStorage.getItem("theme");
    if (!!theme) {
      store.dispatch("theme_action", theme);
    } else {
      store.dispatch("theme_action", "dark");
    }
    return {};
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  height: 100%;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
