<template>
  <div class="login">
    <LoginForm :type="'static'"></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/GlobalComponents/LoginForm";

export default {
  name: "Login_Page",
  components: {
    LoginForm
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.login {
  @include flex(row, center, center);
  width: 100vw;
  height: 100vh;

  @media #{$breakpoint-down-sm} {
    align-items: center;
    overflow-y: auto;
  }
}
</style>