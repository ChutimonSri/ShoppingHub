<template>
  <teleport to="body">
    <transition name="translate">
      <div
        class="sidebar"
        v-if="show"
        :class="[getTheme === 'dark' ? 'nav-bg-dark' : 'nav-bg-light']"
      >
        <div class="close" @click="toggleSideBar">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <transition name="fade" mode="out-in">
            <div v-if="!!items.length" class="table-cont">
              <slot name="table"></slot>
              <div class="actions">
                <slot name="actions"></slot>
              </div>
            </div>
            <div
              v-else
              class="no-items"
              :class="[
                getTheme === 'dark' ? 'bg-dark-primary' : 'nav-bg-light',
              ]"
            >
              <slot name="noItem" />
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="overlay" @click.stop="toggleSideBar" v-if="show"></div>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: ["toggle"],
  props: ["show", "items"],
  methods: {
    toggleSideBar() {
      this.$emit("toggle");
    },
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style lang="scss" scoped>
.translate-enter-from,
.translate-leave-to {
  transform: translateX(100%);
}
.translate-enter-active,
.translate-leave-active {
  transition: all 0.5s ease-in-out;
}

.overlay {
  position: fixed;
  z-index: 1001;
}
::-webkit-scrollbar {
  width: 0px;
  display: none;
}
.sidebar {
  width: 500px;
  min-height: 100%;
  padding: 0 20px;
  position: fixed;
  right: 0;
  top: 0px;
  z-index: 1500;
  @media (max-width: 500px) {
    width: 100%;
  }
  .close {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .header {
    display: block;
    width: 100%;
    padding: 30px 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid var(--gray-color);
  }
  .content {
    position: relative;
    overflow-y: scroll;
    padding: 20px 0 0;
    min-height: calc(100vh - 100px);
    &::-webkit-scrollbar {
      width: 0px;
      display: none;
    }
    .no-items {
      width: 100%;
      text-align: center;
      padding: 20px 10px;
      font-weight: bold;
      border-radius: 10px;
      color: var(--danger-color);
    }
    .table-cont {
      width: 100%;
      height: fit-content;
      position: absolute;
      overflow: scroll;
    }
  }
  .actions {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid #838383;
    width: 100%;
  }
}
</style>
