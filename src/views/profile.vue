<template>
  <div
    class="profile"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <div class="container">
      <div
        class="user-profile-info"
        :class="[getTheme === 'dark' ? 'nav-bg-dark' : 'nav-bg-light']"
      >
        <div class="user-image">
          <base-button @click="toggleUserImage" mode="transparent">
            <img :src="userImageUrl" alt="user iamge" />
          </base-button>
        </div>

        <h3 class="user-name">{{ getFirstName }} {{ getLastName }}</h3>

        <form @submit.prevent="updateUser">
          <div>
            <label>first name</label>
            <input type="text" v-model="firstName" />
          </div>
          <div>
            <label>first name</label>
            <input type="text" v-model="lastName" />
          </div>
          <base-button mode="green">update</base-button>
        </form>
      </div>

      <transition name="fade">
        <div
          v-if="show_user_image"
          class="user-image-prevew"
          :class="[getTheme === 'dark' ? 'nav-bg-dark' : 'nav-bg-light']"
        >
          <div class="close" @click="toggleUserImage">
            <i class="fa-solid fa-x"></i>
          </div>
          <img :src="userImageUrl" alt="user image" />
          <base-button @click="onPickFile" mode="green">
            choose image <i class="fa-regular fa-image"> </i>
          </base-button>
          <input
            type="file"
            @change="updateImage"
            ref="image"
            :style="{ display: 'none' }"
          />
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="show_user_image"
          @click="toggleUserImage"
          class="overlay"
        ></div>
      </transition>
    </div>
    <base-loading v-if="isLoading" />
  </div>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
export default {
  data() {
    return {
      show_user_image: false,
      newImage: "",
      firstName: this.$store.getters.getFirstName,
      lastName: this.$store.getters.getLastName,
      isLoading: false,
    };
  },
  computed: {
    userImageUrl() {
      return this.$store.getters.getImageUrl;
    },
    getUserId() {
      return this.$store.getters.getUserId;
    },
    getFirstName() {
      return this.$store.getters.getFirstName;
    },
    getLastName() {
      return this.$store.getters.getLastName;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  methods: {
    toggleUserImage() {
      this.show_user_image = !this.show_user_image;
    },
    async updateUser() {
      const userRef = doc(db, "users", this.getUserId);
      await updateDoc(userRef, {
        firstName: this.firstName,
        lastName: this.lastName,
      });
    },
    onPickFile() {
      this.$refs.image.click();
    },
    async updateImage(event) {
      this.isLoading = true;
      const files = event.target.files;
      const storageRef = ref(storage, `users/${this.getUserId}`);
      const userRef = doc(db, "users", this.getUserId);
      await uploadBytes(storageRef, files[0]).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          await updateDoc(userRef, {
            image: url,
          }).then(() => {
            this.$store.commit("setUserImage", url);
          });
        });
      });
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
}
.profile {
  margin-top: 60px;
  min-height: 100vh;
  .container {
    padding-top: 80px;
    padding-bottom: 30px;
    display: grid;
    place-items: center;
    .user-profile-info {
      width: 450px;
      padding: 30px 20px;
      // height: 500px;
      border-radius: 10px;
      position: relative;
      @media (max-width: 600px) {
        width: 100%;
      }
      .user-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        padding: 3px;
        border: 2px solid var(--main-color);
        button {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 0;
          &:hover {
            opacity: 1;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      .user-name {
        margin-top: 85px;
        width: 100%;
        text-align: center;
        color: var(--main-color);
      }

      form {
        margin-top: 50px;
        width: 100%;
        div {
          width: 100%;
          margin-bottom: 20px;
          label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
          }
          input {
            display: block;
            width: 100%;
            padding: 5px;
            border: 1px solid var(--main-color);
            outline: none;
            border-radius: 5px;
          }
        }
      }
    }
    .user-image-prevew {
      width: 250px;
      position: absolute;
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      border-radius: 10px;
      z-index: 150;
      padding: 5px 5px 10px;
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--danger-color);
        color: #fff;
        display: grid;
        place-items: center;
        cursor: pointer;
        font-weight: bold;
      }
      img {
        width: 100%;
        // height: 80%;
        border-radius: 10px;
        height: 300px;
        border-radius: 50%;
      }
    }
  }
}
</style>
