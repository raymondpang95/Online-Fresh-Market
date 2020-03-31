<template>
  <div :class="isActive ? 'loaderGif' : 'loaderGif d-none'">
    <img :src="require('@/assets/loader.gif')" />
  </div>
</template>

<script>
export default {
  name: "loader",
  computed: {
    isActive() {
      return this.$store.getters.getLoader;
    }
  }
};
</script>

<style lang="scss">
.loaderGif {
  @include flex(row, center, center);
  background-color: rgba(white, 0.8);
  position: fixed;
  z-index: 100001;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  img {
    @include image(contain);
    height: 250px;
    width: 250px;
  }
}
</style>