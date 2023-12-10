<template>
  <div
    class="offer bg-image"
    :style="{ backgroundImage: `url(${offer.bgImage})` }"
  >
    <div class="overlay"></div>
    <div class="offer-cont">
      <h3 class="header">{{ offer.header }}</h3>
      <p>
        get up to <span>{{ offer.sale }} $</span> off
      </p>
      <base-button mode="green">
        <router-link to="/">shop now</router-link>
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["offer"],
};
</script>

<style scoped lang="scss">
.offer {
  padding: 3rem 40px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  .overlay{
    opacity:  .6;
  }
  .offer-cont {
    position: relative;
    z-index: 100;
    .header {
      font-weight: bold !important;
      font-size: calc(1.27813rem + 0.3375vw);
      // color: var(--primary-color);
      color: #fff;
      margin-bottom: 0.5rem;
    }
    p {
      margin-bottom: 1rem;
        color: #fff;
      text-transform: capitalize;
      font-weight: bold;

      span {
        color: orangered ;
        font-weight: bolder;
      }
    }
    a {
      color: inherit;
    }
  }
}
</style>