<template>
  <div class="form-container">
    <popup v-if="!!error" @close="error = ''">{{ error }}</popup>
    <base-loading v-if="loading" />
    <div class="overlay"></div>
    <form
      v-if="login"
      class="login"
      @submit.prevent=""
      :class="[getTheme === 'dark' ? 'nav-bg-dark' : 'nav-bg-light']"
    >
      <h2 class="title">login</h2>
      <div class="form-controle" :class="[email.isvalid ? '' : 'notvalid']">
        <input
          type="email"
          v-model.trim="email.email"
          @blur="checkEmailValidity"
          @focus="clearEmailValidity"
          required
        />
        <label :class="[email.email ? 'focus' : '']">email</label>
      </div>
      <div class="form-controle" :class="[password.isvalid ? '' : 'notvalid']">
        <input
          type="password"
          name="password"
          v-model.trim="password.password"
          @blur="checkPassValidity"
          @focus="clearPassValidity"
          required
        />
        <label :class="[password.password ? 'focus' : '']">password</label>
      </div>
      <base-button @click="signIn" mode="green">login</base-button>
      <p>
        or create account<base-button @click="toggleLogin" mode="link"
          >signUp</base-button
        >
      </p>
    </form>

    <form
      v-else
      class="signup"
      @submit.prevent="createUser"
      :class="[getTheme === 'dark' ? 'nav-bg-dark' : 'nav-bg-light']"
    >
      <h2 class="title">create account</h2>
      <div class="form-controle" :class="[fname.isvalid ? '' : 'notvalid']">
        <input
          type="text"
          v-model.trim="fname.fname"
          @blur="checkFnameValidity"
          @focus="clearFnameValidity"
          required
        />
        <label :class="[fname.fname ? 'focus' : '']">first name</label>
      </div>
      <div class="form-controle" :class="[lname.isvalid ? '' : 'notvalid']">
        <input
          type="text"
          v-model.trim="lname.lname"
          @blur="checkLnameValidity"
          @focus="clearLnameValidity"
          required
        />
        <label :class="[lname.lname ? 'focus' : '']">last name</label>
      </div>
      <div class="form-controle" :class="[email.isvalid ? '' : 'notvalid']">
        <input
          type="email"
          v-model.trim="email.email"
          @blur="checkEmailValidity"
          @focus="clearEmailValidity"
          required
        />
        <label :class="[email.email ? 'focus' : '']">email</label>
      </div>
      <div class="form-controle" :class="[password.isvalid ? '' : 'notvalid']">
        <input
          type="password"
          name="password"
          v-model.trim="password.password"
          @blur="checkPassValidity"
          @focus="clearPassValidity"
          required
        />
        <label :class="[password.password ? 'focus' : '']">password</label>
      </div>

      <div class="choseImage">
        <label>image</label>
        <div class="image">
          <base-button @click.prevent="onFilePicked" mode="green"
            >choose image</base-button
          >
          <img v-if="imageUrl" class="prevwe" :src="imageUrl" alt="" />
        </div>
        <input
          @change="onFileChanged"
          :style="{ display: 'none' }"
          ref="fileInput"
          accept="image/*"
          type="file"
        />
      </div>
      <base-button mode="green">signUp</base-button>
      <p>
        already have account<base-button @click="toggleLogin" mode="link"
          >login</base-button
        >
      </p>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import baseButton from "@/components/basics/base-button.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  components: { baseButton },
  setup() {
    const store = useStore();
    const email = reactive({
      email: "",
      isvalid: true,
    });
    const password = reactive({
      password: "",
      isvalid: true,
    });
    const fname = reactive({
      fname: "",
      isvalid: true,
    });

    const lname = reactive({
      lname: "",
      isvalid: true,
    });

    const login = ref(true);
    const toggleLogin = () => {
      login.value = !login.value;
    };

    const checkFnameValidity = () => {
      fname.isvalid = fname.fname.length > 0 ? true : false;
    };
    const clearFnameValidity = () => {
      fname.isvalid = true;
    };

    const checkLnameValidity = () => {
      lname.isvalid = lname.lname.length > 0 ? true : false;
    };
    const clearLnameValidity = () => {
      lname.isvalid = true;
    };

    const checkEmailValidity = () => {
      email.isvalid = email.email.length > 0 ? true : false;
    };
    const clearEmailValidity = () => {
      email.isvalid = true;
    };
    const checkPassValidity = () => {
      password.isvalid = password.password.length > 0 ? true : false;
    };
    const clearPassValidity = () => {
      password.isvalid = true;
    };

    const fileInput = ref(null);
    const onFilePicked = () => {
      fileInput.value.click();
    };

    const imageUrl = ref("");
    const file = ref("");
    const fileName = ref("");
    const error = ref("");

    const onFileChanged = async (event) => {
      const files = event.target.files;
      file.value = files[0];
      fileName.value = event.target.files[0].name;
      const filereader = new FileReader();
      filereader.addEventListener("load", () => {
        imageUrl.value = filereader.result;
      });
      filereader.readAsDataURL(files[0]);
    };

    let loading = ref(false);
    const route = useRoute();
    const router = useRouter();
    const createUser = async () => {
      loading.value = true;
      try {
        await store.dispatch("createUser", {
          firstName: fname.fname,
          lastName: lname.lname,
          image: file.value,
          email: email.email,
          password: password.password,
        });
        router.replace("/");
      } catch (err) {
        error.value = err.message;
      }

      loading.value = false;
      // router.replace("/");
    };
    const signIn = async () => {
      loading.value = true;
      try {
        await store.dispatch("signIn", {
          email: email.email,
          password: password.password,
        });
        router.replace("/");
      } catch (err) {
        error.value = err.message;
      }

      loading.value = false;
      // router.replace("/");
    };
    return {
      email,
      password,
      loading,
      fname,
      lname,
      fileInput,
      onFileChanged,
      file,
      imageUrl,
      onFilePicked,
      checkLnameValidity,
      clearLnameValidity,
      checkFnameValidity,
      clearFnameValidity,
      checkEmailValidity,
      clearEmailValidity,
      checkPassValidity,
      clearPassValidity,
      createUser,
      signIn,
      login,
      toggleLogin,
      error,
    };
  },
};
</script>

<style scoped lang="scss">
.image {
  display: flex;
  align-items: center;

  .prevwe {
    width: 70px;
    height: 70px;
    margin-left: 20px;
  }
}
.disabled {
  cursor: not-allowed;
  background-color: gray;
  opacity: 0.5;
}
.form-container {
  width: 100%;
  padding: 30px 0;
  min-height: 100vh;
  margin-top: 60px;
  @media (max-height: 380px) {
    height: 100% !important;
  }
  background-image: url("../assets/background/bg-login.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  display: grid;
  place-items: center;
  position: relative;
  @media (max-width: 600px) {
    padding: 0 20px;
  }

  form {
    width: 400px;
    height: auto;
    padding: 30px 20px;
    border-radius: 5px;
    position: relative;
    z-index: 100;
    @media (max-width: 600px) {
      width: 100%;
    }
    .title {
      text-align: center;
      margin: 0 0 30px;
      text-transform: capitalize;
      color: var(--main-color);
    }
    .choseImage {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 10px;
      }
    }
    .form-controle {
      &:last-of-type {
        margin-bottom: 20px;
      }
      width: 100%;
      margin-bottom: 40px;
      position: relative;
      &.notvalid {
        input {
          border-bottom: 1px solid red;
        }
        label {
          color: red;
        }
        &::before {
          content: "*";
          position: absolute;
          font-size: 30px;
          color: red;
          right: 0;
          top: -7px;
        }
      }

      input {
        display: block;
        width: 100%;
        padding: 5px;
        outline: none;
        border: none;
        border-bottom: 1px solid var(--main-color);
        font-size: 18px;
        text-transform: initial;
        background-color: transparent;
        color: inherit;
        &:focus ~ label {
          top: -20px;
          left: 0;
          font-size: 16px;
          font-weight: bold;
          color: inherit;
        }
      }
      label {
        position: absolute;
        top: -3px;
        left: 3px;
        font-size: 18px;
        pointer-events: none;
        transition: all 0.3s ease;
        &.focus {
          top: -20px;
          left: 0;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
