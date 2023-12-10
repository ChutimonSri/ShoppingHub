<template>
  <div class="loading">
    <div class="overlay"></div>
    <div class="loading-cont">
      <div class="loading-spin"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.loading {
  width: 100%;
  height: 100%;
  z-index: 1500;
  position: fixed;
  top: 0;
  left: 0;
  .loading-cont {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    .loading-spin {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // background-color: aqua;
      border: 8px solid;
      border-color: #ffffff #0000;
      z-index: 101;
      animation: spiner 1s ease-in-out infinite;
      @keyframes spiner {
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
