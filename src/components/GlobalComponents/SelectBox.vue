<template>
  <div class="select">
    <select
      :name="name"
      :value="model"
      :required="(required) ? 'required' : ''"
      @change="onchanges"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  name: "select_box_component",
  props: ["name", "model", "required"],
  model: {
    prop: "model",
    event: "change"
  },
  data() {
    return {};
  },
  methods: {
    onchanges(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>

<style lang="scss">
.select {
  position: relative;
  display: block;
  width: 100%;
  &:after {
    content: "\f10c";
    display: block;
    font-family: "Flaticon";
    transform: translateY(-50%);
    position: absolute;
    font-size: 8px;
    right: 8px;
    top: 50%;
    color: $color-14;
  }
  &:hover {
    &:after {
      color: white;
    }
  }
  select {
    padding-right: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    border-radius: 4px;
    outline: none;
    border: 1px solid rgba($color-secondary, 0.1);
    transition: 0.3s;
    font-size: 14px;
    option {
      background-color: white;
      color: $color-14;
      &:hover {
        color: white;
        background-color: red !important;
      }
      // &:focus,
      // &:checked {
      //   background-color: rgba($color-secondary, 0.1);
      //   color: white;
      // }
      // &:checked {
      //   background-color: red;
      // }
    }
    &:active {
      // outline-color: $color-secondary;
      border: 1px solid $color-secondary;
    }
    &:hover {
      border: 1px solid $color-secondary;
      color: white;
      background-color: $color-secondary;
      // outline-color: $color-secondary;
    }
  }
}
</style>