<template>
  <div
    class="products"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <div class="container">
      <div class="prods-cont">
        <transition-group name="items">
          <item v-for="item in filteredItems" :key="item.id" :item="item" />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getAllItems() {
      return this.$store.getters.getAllItems;
    },
    filteredItems() {
      if (this.$route.query.catigory == "all") {
        return this.$store.getters.getAllItems;
      } else {
        return this.$store.getters.getAllItems.filter((item) => {
          return item.catigory === this.$route.query.catigory;
        });
      }
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none;
}
.items-enter-from,
.items-leave-to {
  opacity: 0;
}

.items-enter-active,
.items-leave-active {
  transition: all 0.3s ease-in;
}
.items-leave-active {
  position: absolute;
}
.items-move {
  transition: all 0.3s ease-in;
}

.products {
  margin-top: 60px;
  padding-bottom: 50px;
  height: 100%;
  min-height: 100vh;
  .container {
    padding-top: 30px;
    position: relative;
    height: 100%;

    .prods-cont {
      width: 100%;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
}
</style>
