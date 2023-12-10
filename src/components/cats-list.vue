<template>
  <div
    class="cat-list"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <ul>
      <li>
        <router-link :to="{ name: 'products', query: { catigory: 'all' } }">
          <base-button mode="link"> all catigories </base-button>
        </router-link>
      </li>
      <li v-for="cat in getAllItems" :key="cat.id">
        <router-link
          :to="{ name: 'products', query: { catigory: cat.catigory } }"
        >
          <base-button mode="link">
            {{ cat.catigory }}
          </base-button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    getAllItems() {
      return this.$store.getters.getAllItems;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style lang="scss" scoped>
.cat-list {
  position: absolute;
  transition: all 0.3s ease-in-out;
  top: 60px;
  right: 100px;
  border-radius: 5px;
  display: none;
  width: 500px;
  ul {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    li {
      a {
        display: block;
        width: 100%;
        color: var(--primary-color);
        font-weight: bold;
        text-align: center;
        button {
          padding: 0;
        }
      }
    }
  }
}
</style>
