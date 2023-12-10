<template>
  <div
    class="theme"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <transition name="dark">
      <span
        class="dark"
        v-if="getTheme === 'dark'"
        @click.passive="setTheme('light')"
      >
        <i class="fa-solid fa-moon"></i>
      </span>
    </transition>
    <transition name="light">
      <span class="light" v-if="getTheme === 'light'" @click="setTheme('dark')">
        <i class="fa-solid fa-sun"></i>
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      them: "light",
    };
  },
  methods: {
    setTheme(theme) {
      this.$store.dispatch("theme_action", theme);
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
.dark-enter-from,
.dark-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.dark-enter-active,
.dark-leave-active {
  transition: all 0.3s ease-in-out;
}

.light-enter-from,
.light-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.light-enter-active,
.light-leave-active {
  transition: all 0.3s ease-in-out;
}
.theme {
  border-radius: 100px;
  width: 50px;
  box-shadow: 0 0px 8px var(--main-color) inset;
  cursor: pointer;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 28px;

  span {
    font-size: 12px;
    padding: 3px;
    background-color: var(--main-color);
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: grid;
    place-items: center;
    color: #fff;
    position: absolute;
    top: 5px;
  }
  .dark {
    right: 5px;
  }
  .light {
    left: 5px;
    // background-color: #eee;
  }
}
</style>
