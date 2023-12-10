<template>
  <teleport to="body">
    <div class="popup">
      <div class="overlay" @click.self="close"></div>
      <transition name="fade">
        <div class="popup-container">
          <div class="close" @click="close">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: fixed;
  z-index: 1501;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  .popup-container {
    z-index: 105;
    position: relative;
    width: 400px;
    min-height: 200px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    .close {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      width: 30px;
      height: 30px;
      padding: 3px;
      display: grid;
      place-items: center;
      background-color: var(--primary-color);
      border-radius: 50%;
      color: #fff;
    }
    .content {
      display: block;
      width: 100%;
      text-align: center;
      color: red;
      font-size: 22px;
      white-space: wrap;
      font-weight: bold;
      line-height: 2;
    }
  }
}
</style>
