<template>
  <div class="card" :class="[getTheme === 'dark' ? 'bg-dark' : 'bg-light']">
    <img :src="img" alt="" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 100%;
  height: auto;
  border: 1px solid #bebebe;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  overflow: hidden;
  img {
    width: 130px;
    height: 130px;
    border-radius: 5px;
  }
  .title {
    margin: 10px auto 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
    color: inherit;
    font-size: 13px;
    // width: 70%;
  }
}
</style>
