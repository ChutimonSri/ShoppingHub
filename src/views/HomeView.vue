<template>
  <div
    class="home"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <carousel />
    <featuredCategories />
    <popular />
  </div>
</template>
<script>
import carousel from "@/components/carousel";
import featuredCategories from "@/components/featuredCategories";
import popular from "@/components/popular";

export default {
  components: {
    carousel,
    featuredCategories,
    popular,
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  min-height: 100vh;
}
</style>
