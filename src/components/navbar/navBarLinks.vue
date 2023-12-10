<template>
  <ul class="links">
    <li><theme /></li>
    <li><router-link :to="{ name: 'home' }">home</router-link></li>
    <li class="shop-link">
      <router-link :to="{ name: 'products', query: { catigory: 'all' } }"
        >shop <i class="fa-solid fa-chevron-down"></i
      ></router-link>
      <catsList />
    </li>
    <li>
      <base-button @click="toggleLoves" mode="transparent">
        <div class="number">
          <span v-if="getUserCartLength < 100">{{ getUserLovesLength }}</span>
          <span v-else>+99</span>
        </div>
        <i class="fa-regular fa-heart"></i
      ></base-button>
    </li>
    <li>
      <base-button @click="toggleCart" mode="transparent">
        <div class="number">
          <span v-if="getUserCartLength < 100">{{ getUserCartLength }}</span>
          <span v-else>+99</span>
        </div>
        <i class="fa-solid fa-cart-arrow-down"></i>
      </base-button>
    </li>
    <li v-if="!userIsLoged">
      <router-link :to="{ name: 'auth' }"
        ><i class="fa-regular fa-user"></i
      ></router-link>
    </li>
    <li v-else class="user">
      <img @click="toggleUserInfo" :src="userImageUrl" alt="user" />
      <transition name="fade">
        <div v-show="show_user_info" class="userinfo">
          <ul>
            <li class="username">
              <router-link :to="{ name: 'profile' }">
                <img :src="userImageUrl" alt="user image" />
                {{ firstName }} {{ lastName }}
              </router-link>
            </li>
          
            <li @click="toggleUserInfo">
              <router-link to="/orders">your orders</router-link>
            </li>
            <li class="logout">
              <base-button @click="logOut" mode="green"
                >logOut <i class="fa-solid fa-right-from-bracket"></i
              ></base-button>
            </li>
          </ul>
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>
import catsList from "@/components/cats-list";
import theme from "@/components/theme/theme";
export default {
  props: ["show_user_info"],
  components: {
    catsList,
    theme,
  },
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
    getUserCartLength() {
      return this.$store.getters.getUserCart.length;
    },
    getUserLovesLength() {
      return this.$store.getters.getUserLoves.length;
    },
  },
  methods: {
    toggleCart() {
      this.$store.commit("setShowCart");
    },
    toggleLoves() {
      this.$store.commit("setShowLoves");
    },
    toggleUserInfo() {
      this.$emit("toggleUserInfo");
    },
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.replace("/");
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
.links {
  height: 100%;
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: space-between;
  button {
    font-size: 25px;
    padding: 0;
  }
  @media (max-width: 650px) {
    display: none;
  }
  .shop-link {
    &:hover {
      .cat-list {
        display: block;
      }
    }
  }

  li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: inherit;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.3s ease;
      padding: 5px 10px;
      &.router-link-active,
      &:hover {
        background-color: var(--main-color);
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .user {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    position: relative;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid var(--main-color);
      padding: 3px;
    }
    .userinfo {
      width: 170px;
      background-color: var(--primary-color);
      position: absolute;
      top: 105%;
      right: 0;
      padding: 20px;
      font-size: 14px;
      ul {
        width: 100%;
        button {
          font-size: 14px;
          padding: 8px 20px;
        }
        li {
          display: block;
          width: 100%;
          color: var(--main-color);
          margin-bottom: 20px;
          a {
            font-size: 14px;
            color: blue;
            text-decoration: underline;
          }
          &.username {
            a {
              &.router-link-active {
                background-color: transparent;
              }
              padding-bottom: 20px;
              text-decoration: none;
              color: #fff;
              width: 100%;
              cursor: pointer;
              display: flex;
              align-items: center;
              border-bottom: 2px solid var(--main-color);
              font-size: 0.7rem;
              font-weight: bold;
              img {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
