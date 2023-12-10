<template>
  <div
    class="carousel"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <div class="container">
      <swiper
        :modules="modules"
        :space-between="0"
        :slides-per-view="1"
        :loop="true"
        :pagination="{
          clickable: true,
          dynamicBullets: true,
        }"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
      >
        <swiper-slide v-for="(slide, i) in carousels" :key="i">
          <div
            class="slide-container bg-image"
            :style="{ backgroundImage: 'url(' + slide.img + ')' }"
          >
            <div class="heading">
              <baseBadge>{{ slide.badge }}</baseBadge>
              <h2 class="title">{{ slide.title }}</h2>
              <p class="text">{{ slide.text }}</p>
              <base-button class="btn" mode="black"
                ><span>shop now</span><i class="fa-solid fa-arrow-right"></i
              ></base-button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  setup() {
    const carousels = ref([
      {
        img: require("../assets/main-carousel/slider-1.jpg"),
        title: "superMarket for fresh grocery",
        text: "Introduced a new model for online grocery shopping and convenient home delivery",
        badge: "opining sale discount 50%",
      },
      {
        img: require("../assets/main-carousel/slider-2.jpg"),
        title: "free shopping in order over 100$",
        text: "Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
        badge: "free shopping-free over 100$",
      },
    ]);
    return {
      carousels,
      modules: [Autoplay, Pagination],
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 60px;
  @media (max-width: 768px) {
    margin-top: 90px;
  }

  .container {
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    .slide-container {
      height: 500px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .heading {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 0 0 100px;
        height: 100%;
        @media (max-width: 992px) {
          padding: 0 0 0 30px;
          width: 80%;
        }
        .title {
          text-transform: capitalize;
          color: var(--primary-color);
          font-size: 50px;
          font-weight: 900;
          font-family: "Open Sans", sans-serif;
          text-overflow: ellipsis;
          @media (max-width: 768px) {
            font-size: 35px;
          }
        }
        .text {
          text-transform: capitalize;
          margin-top: 20px;
          font-size: 1.09375rem;
          font-weight: bold;
          color: #6a7a81;
          text-overflow: ellipsis;
        }
        .btn {
          width: fit-content;
          margin-top: 20px;
          text-transform: capitalize;
          font-family: "Open Sans", sans-serif;
          span {
            padding-right: 10px;
          }
        }
      }
    }
  }
}
</style>
