<template>
  <div class="progress-form-component">
    <div class="head card mb-0 lg-mb-3">
      <div class="titleCard" v-if="formTitle != null">
        <h1 class="title">{{ formTitle }}</h1>
      </div>
      <div class="progress mt-4">
        <div
          :style="'width: calc(100% / ' + progressTitle.length + ');'"
          :class="(currentShowing >= index) ? ((currentShowing == index) ? 'group active' : 'group done') : 'group'"
          v-for="(title, index) in this.progressTitle"
          :key="formTitle + index"
        >
          <h2>{{ index + 1 }}</h2>
          <p>{{ title }}</p>
        </div>
      </div>
    </div>

    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
var glob;

export default {
  name: "progress-form-component",
  props: {
    formTitle: String,
    handleSubmit: Function,
    multipleSelect: Boolean
  },
  data() {
    return {
      progressTitle: [],
      currentShowing: 0,
      forms: []
    };
  },
  watch: {
    $route(newVal, oldVal) {
      if (
        parseInt(newVal.hash.substring(1)) > parseInt(oldVal.hash.substring(1))
      ) {
        glob.currentShowing = parseInt(newVal.hash.substring(1)) - 1;

        glob.toggleForm();
      } else if (
        parseInt(newVal.hash.substring(1)) < parseInt(oldVal.hash.substring(1))
      ) {
        glob.currentShowing = parseInt(newVal.hash.substring(1)) - 1;

        glob.toggleForm();
      }
    }
  },
  mounted() {
    glob = this;

    this.currentShowing = parseInt(this.$route.hash.substring(1)) - 1;

    this.toggleForm();
    this.progressTitle = [];

    for (var x of this.$children) {
      this.progressTitle.push(x.pageTitle);
    }
  },
  methods: {
    async submitForm() {
      var form = new FormData();

      for (var x of this.forms) {
        for (var entry of new FormData(x).entries()) {
          form.append(entry[0], entry[1]);
        }
      }

      this.handleSubmit(form);
    },
    nextForm(form) {
      this.forms.push(form);

      var totalForm = this.$children.length;
      if (this.currentShowing < totalForm - 1) {
        this.currentShowing++;

        this.changeHash();
      } else {
        this.submitForm();
      }
    },
    prevForm() {
      this.forms.pop();

      window.history.back();
    },
    changeHash() {
      window.location.hash = "#" + (this.currentShowing + 1);
    },
    toggleForm() {
      window.scrollTo(0, 0);

      var totalForm = this.$children.length;

      for (var child of this.$children) {
        child.isActive = false;
      }
      this.$children[this.currentShowing].isActive = true;

      if (this.currentShowing == totalForm - 1) {
        this.$children[this.currentShowing].buttonText = "完成";
      }

      if (this.currentShowing > 0) {
        this.$children[this.currentShowing].showPrev = true;
      } else {
        this.$children[this.currentShowing].showPrev = false;
      }
    }
  }
};
</script>

<style lang="scss">
.progress-form-component {
  .head {
    padding: 16px 0;
    .titleCard {
      @include flex(row, space-between, center);
      .title {
        flex: 3;
        font-size: 28px;
        padding: 0 16px;
        color: $color-secondary;
        @media #{$breakpoint-down-xs} {
          font-size: 24px;
          font-weight: 400;
        }
      }
    }
    .progress {
      @include flex(row, center, center);
      flex: 9;
      padding: 0 16px;
      .group {
        @include flex(column, center, center);
        position: relative;
        text-align: center;
        &:last-of-type {
          &:before {
            display: none;
          }
        }
        &.active {
          &:before {
            background-color: $color-secondary;
          }
          h2 {
            background-color: lighten($color-secondary, 65);
            border-color: $color-secondary;
            color: $color-secondary;
          }
          p {
            color: $color-secondary;
          }
        }
        &.done {
          &:before {
            background-color: $color-secondary;
          }
          h2 {
            background-color: $color-secondary;
            border-color: $color-secondary;
            color: white;
          }
          p {
            color: $color-secondary;
          }
        }
        &:before {
          content: "";
          top: 30%;
          left: 50%;
          z-index: 0;
          height: 3px;
          width: 100%;
          position: absolute;
          background-color: $color-6;
          transform: translateY(-50%);
        }
        h2 {
          @include flex(row, center, center);
          border: 3px solid $color-6;
          background-color: white;
          position: relative;
          border-radius: 50%;
          font-size: 22px;
          color: $color-1;
          height: 50px;
          width: 50px;
          z-index: 1;
        }
        p {
          margin-top: 8px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>