<template>
  <button class="btn" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["mode"],
};
</script>

<style>
.btn {
  padding: 8px 20px;
  border-radius: 5px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: bold;
}
.btn:hover {
  opacity: 0.8;
}
.green {
  background-color: var(--main-color);
}
.black {
  background-color: var(--primary-color);
}
.transparent {
  background-color: transparent;
  color: var(--main-color);
}
.danger {
  background-color: var(--danger-color);
}

.link {
  background-color: transparent;
  color: blue;
  text-decoration: underline;
}
</style>
