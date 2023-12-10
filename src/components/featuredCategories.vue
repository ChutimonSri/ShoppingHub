<template>
  <div
    class="featured"
    :class="[getTheme === 'dark' ? 'bg-dark-primary' : 'bg-light']"
  >
    <div class="container">
      <base-title class="title">featured catigories</base-title>
      <swiper
        v-if="featuredItems.length"
        :spaceBetween="0"
        :creativeEffect="{
          prev: {
            shadow: true,
            translate: ['-120%', 0, -500],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500],
          },
        }"
        :breakpoints="
          featuredItems.length <= 2 ? breakpoints[300] : breakpoints
        "
        :loop="true"
        :loopFillGroupWithBlank="true"
        :navigation="true"
        :modules="modules"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="(cat, i) in featuredItems" :key="i">
          <featureIitem :img="cat.image" :title="cat.name" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="offers" :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']">
      <div class="container">
        <offer v-for="o in offers" :key="o" :offer="o" />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/a11y";
import { Navigation, Autoplay, EffectCreative } from "swiper";
import { reactive, ref } from "@vue/reactivity";
import featureIitem from "@/components/feature-item.vue";
import offer from "@/components/offer";

import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  components: {
    Swiper,
    SwiperSlide,
    featureIitem,
    offer,
  },
  data() {
    return {
      offers: [
        {
          bgImage: require("../assets/offers/grocery-banner.png"),
          header: "Fruits & Vegetables",
          sale: 30,
        },
        {
          bgImage: require("../assets/offers/grocery-banner-2.jpg"),
          header: "Freshly Baked Buns",
          sale: 25,
        },
      ],
      featuredItems: [],
      modules: [Navigation, Autoplay, EffectCreative],
    };
  },
  methods: {
    getFeaturedItems() {
      const featuredRef = collection(db, "FeaturedItems");
      onSnapshot(featuredRef, (Response) => {
        const feats = [];
        Response.docs.forEach((doc) => {
          feats.push({ ...doc.data(), id: doc.id });
        });
        this.featuredItems = feats.reverse();
      });
    },
    getOffers() {
      const offersRef = collection(db, "offers");
      onSnapshot(offersRef, (Response) => {
        const o = [];
        Response.docs.forEach((doc) => {
          o.push({ ...doc.data(), id: doc.id });
        });
        this.offers = o.slice(0, 4);
      });
    },
  },
  created() {
    this.getFeaturedItems();
    this.getOffers();
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
    breakpoints() {
      return {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },
        300: {
          slidesPerView: 2,
          spaceBetween: 15,
          slidesPerGroup: 2,
        },

        500: {
          slidesPerView: 2,
          spaceBetween: 15,
          slidesPerGroup: 2,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
          slidesPerGroup: 3,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 15,
          slidesPerGroup: 4,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 15,
          slidesPerGroup: 5,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.featured {
  .container {
    padding: 10px;
  }
  .offers {
    padding: 0 10px;
    .container {
      padding: 30px 0;
      margin-top: 30px;
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
}
</style>

<style lang="scss">
.swiper {
  overflow: visible !important;
  overflow-x: clip !important;
}
.swiper .swiper-button-prev,
.swiper .swiper-button-next {
  width: 30px;
  height: 30px;
  top: -25px;
  z-index: 100;
  background-color: #eee;
  border-radius: 50%;
  display: grid !important;
  place-items: center;
  &::after {
    font-size: 16px;
    font-weight: bold;
    color: var(--primary-color);
  }
}
.swiper .swiper-button-next {
  right: 20px !important;
}
.swiper .swiper-button-prev {
  right: 55px !important;
  left: auto;
}
</style>
