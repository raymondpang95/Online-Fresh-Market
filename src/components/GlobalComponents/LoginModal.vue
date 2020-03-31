<template>
  <div :class="(modalState) ? 'login active' : 'login'" id="login">
    <LoginForm :type="'modal'"></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/GlobalComponents/LoginForm";

var glob;

export default {
  name: "login_modal",
  components: {
    LoginForm
  },
  data() {
    return {
      modalState: false
    };
  },
  mounted() {
    glob = this;
  },
  computed: {
    tempModalState() {
      return this.$store.getters.getLoginModalState;
    }
  },
  watch: {
    tempModalState(newVal, oldVal) {
      glob.modalState = newVal;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
#login {
  display: block;
  height: 100%;
  width: 100%;

  &:before {
    content: "";
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    transition: 0.3s;
    visibility: hidden;
    background-color: rgba(black, 0.8);
  }

  &.active {
    &:before {
      opacity: 1;
      visibility: visible;
    }
    .loginCard {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 50%);
    }
  }

  .loginCard {
    transform: translate(-50%, 40%);
    visibility: hidden;
    transition: 0.3s;
    position: fixed;
    z-index: 1000;
    bottom: 50%;
    opacity: 0;
    left: 50%;
  }
}
</style>