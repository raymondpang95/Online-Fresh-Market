<template>
  <div class="multiple-select-component">
    <div class="instantAdd">
      <form @submit.prevent="submitForm" class="d-flex justify-content-between h-100">
        <input type="text" required v-model="instantAddInput" class />
        <!-- <button  class="btn sm bg-secondary">添加</button> -->
        <button type="submit" class="px-0 pt-2 h-100">
          <i class="flaticon-plus h5 mr-1 icon add"></i>
        </button>
      </form>
    </div>
    <div class="selects">
      <div
        v-for="(title, index) in this.checkboxes"
        :key="title + index"
        :class="(checkOccurance(title)) ? 'selectGroup active ' + designClass : 'selectGroup ' + designClass"
      >
        <div class="listTile">
          <span class="mx-1">{{ index + 1 }}</span>
          <label @click="clickCheckboxLabel">
            <span>{{ title.title }}</span>
          </label>
        </div>
        <input
          @click="clickCheckbox"
          type="checkbox"
          :name="checkboxName + '[]'"
          v-model="checkModel"
          :value="title.id"
          @change="handleCheck"
          :required="required"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/controller.js";

export default {
  name: "multiple-select-component",
  props: {
    checked: Array,
    checkboxName: String,
    checkboxes: Array,
    apiLink: String,
    afterApiCall: Function,
    designClass: String,
    required: Boolean
  },
  model: {
    prop: "checked",
    event: "change"
  },
  mounted() {
    this.checkModel = this.checked;
  },
  data() {
    return {
      instantAddInput: "",
      checkModel: []
    };
  },
  methods: {
    checkOccurance(currentRow) {
      for (let x of this.checkModel) {
        if (x == currentRow.id) {
          return true;
        }
      }
    },
    handleCheck(e) {
      this.$emit("change", this.checkModel);
    },
    clickCheckboxLabel(e) {
      e.currentTarget.parentNode.nextSibling.click();
    },
    clickCheckbox(e) {
      e.currentTarget.parentNode.classList.toggle("active");
    },
    submitForm() {
      axios
        .post(this.apiLink, {
          title: this.instantAddInput
        })
        .then(res => {
          console.log(res);
          this.afterApiCall();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">
* {
  // border: solid 1px red;
}
.multiple-select-component {
  margin: 8px 0 16px;
  width: 100%;
  .instantAdd {
    form {
      @include flex(row, flex-start, flex-start);
      margin: 0 0 16px;
      height: 32px;
      input {
        width: calc(100% - 44.64px);
      }
      .btn {
        height: 100%;
        margin: 8px 4px;
        z-index: 1111111;
      }
    }
  }
  .selects {
    border: solid 3px #ebedf2;
    overflow-y: auto;
    overflow-x: auto;
    height: 280px;
    margin: 8px 0;
    padding: 4px;
    width: 100%;
  }

  .selectGroup {
    @include flex(row, space-between, center);
    transition: 0.3s;
    padding: 4px;
    width: 100%;
    &.active {
      label {
        border-color: none;
        color: white;
      }
    }
    &:hover {
      background-color: $color-13;
    }
    .listTile {
      @include flex(row, flex-start, center);
      width: calc(100% - 34px);
      height: 100%;
      label {
        max-width: calc(100% - 34px);
        padding: 4px 10px 4px 10px;
        white-space: nowrap;
        border-radius: 4px;
        position: relative;
        color: $color-11;
        transition: 0.3s;
        cursor: pointer;
        display: block;
        margin: 0 8px;
        span {
          @include ellipsis(1, 1.2, 12px);
          display: block;
        }
      }
    }
    input {
      position: relative;
      margin: 8px 10px;
      cursor: pointer;
      width: 14px;
      z-index: 0;
    }
  }
}
</style>