<template>
  <div class="tab-bar">
    <div class="tabs">
      <button
        class="tab"
        v-for="(btn, index) in windows"
        :key="'window' + index"
        @click="(onTabClick != null) ? changeWindow(index, onTabClick[index]) : changeWindow(index, null)"
      >
        <p>{{ btn }}</p>
      </button>
    </div>
    <div class="tab-window">
      <slot></slot>
    </div>
  </div>
</template>

<script>
var glob;

export default {
  name: "tab-bar",
  props: {
    pageTitle: String,
    onTabClick: Array
  },
  data() {
    return {
      windows: []
    };
  },
  mounted() {
    glob = this;
    this.windows = [];
    const window = document.querySelectorAll(".tab-window .window");

    window.forEach(each => {
      this.windows.push(each.dataset.name);
    });

    setTimeout(() => {
      glob.changeWindow(0);
    }, 1);
  },
  methods: {
    changeWindow(ind, additional) {
      const tabs = document.querySelectorAll(".tab-bar .tabs .tab");
      const window = document.querySelectorAll(".tab-window .window");

      tabs.forEach(each => {
        each.classList.remove("active");
      });

      window.forEach(each => {
        each.classList.remove("active");
      });

      tabs[ind].classList.add("active");
      window[ind].classList.add("active");

      if (additional != null) {
        additional();
      }
    }
  }
};
</script>

<style lang="scss">
.tab-bar {
  .tabs {
    @include flex(row, flex-start, flex-start);
    overflow-x: auto;
    .tab {
      border-bottom: 1px solid #bababa;
      background-color: $color-secondary;
      border-radius: 0;
      margin-right: 2px;
      box-shadow: none;
      max-width: 150px;
      width: 100%;
      padding: 12px 16px;
      outline: none;
      &.active {
        box-shadow: -3px -3px 3px rgba(grey, 0.16), 0 -3px 3px rgba(grey, 0.12);
        border-bottom: 1px solid transparent;
        background-color: white;
        p {
          color: $color-1;
        }
      }
      p {
        white-space: nowrap;
        font-size: 14px;
        line-height: 1;
        color: white;
      }
    }
  }
  .tab-window {
    box-shadow: 0 2px 5px rgba(black, 0.16), 0 5px 12px rgba(black, 0.12);
    background-color: white;
    padding: 8px;
    .window {
      display: none;
      &.active {
        display: block;
      }
    }
  }
}
</style>