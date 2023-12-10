<template>
  <h3 class="title"><slot /></h3>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
  letter-spacing: -0.03rem;
  font-size: calc(1.27813rem + 0.3375vw);
  color: inherit;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 22px;
  margin-top: 0;
  text-transform: capitalize;
  font-weight: 600;
  width: fit-content;
}
</style>
