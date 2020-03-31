<template>
  <div class="formCard card" v-if="isActive">
    <form @submit.prevent="submitForm">
      <div class="progress-section headline">
        <h4
          class="mainTitle my-1 mxn-2 px-2 py-1 lineBottom"
          v-if="pageTitle != null"
        >{{ pageTitle }}</h4>
        <slot></slot>
      </div>

      <div class="btn-wrapper d-flex justify-content-end lg-mx-2 lg-px-2">
        <button type="button" class="btn edit sm" @click="returnBack()" v-if="showPrev">返回</button>
        <button type="submit" class="btn bg-secondary sm ml-2">{{ buttonText }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "progress-form",
  props: {
    pageTitle: String
  },
  data() {
    return {
      isActive: false,
      buttonText: "下一步",
      showPrev: false
    };
  },
  methods: {
    returnBack() {
      this.$parent.prevForm();
    },
    submitForm(e) {
      this.$parent.nextForm(e.target);
    }
  }
};
</script>

<style lang="scss" >
.card {
  .headline {
    .mainTitle {
      font-size: 18px;
      font-weight: 700;
      color: red;
    }
    .subTitle {
    }
  }
}

/* .color-black {
  color: black !important;
} */
</style>