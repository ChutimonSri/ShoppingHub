<template>
  <div class="mobile" :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']">
    <div class="links-cont">
      <div
        v-if="userIsLoged"
        class="user"
        :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']"
      >
        <router-link :to="{ name: 'profile' }">
          <img :src="userImageUrl" alt="user" />{{ firstName }} {{ lastName }}
        </router-link>
      </div>
      <ul>
        <li @click="toggleNaveBar" v-if="!userIsLoged">
          <router-link :to="{ name: 'auth' }"
            ><i class="fa-regular fa-user"></i> signIn</router-link
          >
        </li>
    
        <li @click="toggleNaveBar">
          <router-link :to="{ name: 'home' }">home</router-link>
        </li>
        <li @click="toggleNaveBar" class="shop-link">
          <router-link :to="{ name: 'products', query: { catigory: 'all' } }"
            >shop
          </router-link>
        </li>
        <li @click="toggleNaveBar">
          <router-link :to="{ name: 'orders' }">your orders</router-link>
        </li>
        <li v-if="userIsLoged">
          <base-button @click="logOut" mode="green"
            >logOut <i class="fa-solid fa-right-from-bracket"></i
          ></base-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userIsLoged() {
      return this.$store.getters.getIsLoged;
    },
    firstName() {
      return this.$store.getters.getFirstName;
    },
    lastName() {
      return this.$store.getters.getLastName;
    },
    userImageUrl() {
      return this.$store.getters.getImageUrl;
    },
    userRole() {
      return this.$store.getters.getUserRole;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  methods: {
    toggleNaveBar() {
      this.$emit("toggleNaveBar");
    },
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile {
  min-height: 100vh;
  // background-color: #fff;
  position: fixed;
  right: 0;
  top: 0px;
  z-index: 1500;
  box-shadow: var(--shadow);
  width: 250px;
  .links-cont {
    position: relative;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 70px;
      left: 0;
      height: auto;
      padding: 20px;
      li {
        display: block;
        width: 100%;
        margin: 5px 0;
        a {
          color: inherit;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.3s ease;
          display: block;
          padding: 5px 10px;

          &.router-link-active,
          &:hover {
            background-color: var(--main-color);
            color: #fff;
            border-radius: 5px;
          }
        }
      }
    }
    .user {
      a {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--main-color);
        margin-bottom: 30px;
        border-bottom: 2px solid var(--main-color);
        padding-bottom: 20px;
        cursor: pointer;
        position: fixed;
        width: 100%;
        padding: 20px;
        z-index: 100;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
          border: 2px solid var(--main-color);
          padding: 2px;
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 650px) {
    display: none;
  }
}
</style>
