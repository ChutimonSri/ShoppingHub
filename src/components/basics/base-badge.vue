<template>
  <div class="badge"><slot></slot></div>
</template>

<script>
export default {};
</script>

<style scoped>
.badge {
  background-color: #ffc107;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bolder;
  width: fit-content;
}
</style>