<template>
  <div
    class="footer"
    :class="[getTheme === 'dark' ? 'footer-bg-dark' : 'footer-bg-light']"
  >
    <div class="container">
      <div class="links">
        <router-link :to="{ name: 'home' }">home</router-link>
        <router-link :to="{ name: 'about' }">about us</router-link>
        <router-link :to="{ name: 'products', query: { catigory: 'all' } }"
          >all products</router-link
        >
        <router-link :to="{ name: 'profile' }">your profile</router-link>
      </div>
      <div class="social">
        <base-button mode="green">
          <i class="fa-brands fa-facebook"></i>
        </base-button>
        <base-button mode="green">
          <i class="fa-brands fa-twitter"></i>
        </base-button>
        <base-button mode="green">
          <i class="fa-brands fa-instagram"></i>
        </base-button>
        <base-button mode="green">
          <i class="fa-brands fa-google"></i>
        </base-button>
      </div>
    </div>
    <nav>Chutimon Srisombun 6280262 & Tititan Wisitnonthachai 6280302</nav>
    <nav>Mahidol University International College</nav>
  </div>
</template>

<script>
export default {
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  display: block;
  width: 100%;
  .container {
    padding: 20px 15px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    .links {
      width: 100%;
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      a {
        color: var(--main-color);
        font-weight: bold;
      }
    }
    .social {
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 15px;
      button {
        height: 40px;
        width: 60px;
      }
    }
  }
  nav {
    text-align: center;
    font-weight: bold;
    background-color: var(--primary-color);
    color: #fff;
    width: 100%;
    padding: 20px;
  }
}
</style>
