<template>
  <div :class="(navbarConfig == 'bottom') ? 'entry reverse' : 'entry'">
    <div :class="'navbar ' + navbarConfig">
      <nav class="container-phone">
        <div class="link active">
          <router-link :to="'/home'">
            <i class="flaticon-order icon order"></i>
            <span>订单</span>
          </router-link>
        </div>
        <div class="link">
          <router-link :to="'/home'">
            <i class="flaticon-portfolio icon portfolio"></i>
            <span>帖文</span>
          </router-link>
        </div>
        <div class="link">
          <router-link :to="'/home'">
            <i class="flaticon-user icon account"></i>
            <span>账户</span>
          </router-link>
        </div>
        <div class="link">
          <router-link :to="'/home'">
            <i class="flaticon-feedback icon feedback"></i>
            <span>反馈</span>
          </router-link>
        </div>
        <div class="link">
          <router-link :to="'/home'">
            <i class="flaticon-feedback icon feedback"></i>
            <span>反馈</span>
          </router-link>
        </div>
      </nav>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <login-modal></login-modal>
  </div>
</template>

<script>
import login from "@/components/GlobalComponents/LoginModal";
import controller from "@/controller";

let glob;

export default {
  name: "home",
  components: {
    "login-modal": login
  },
  data() {
    return {
      navbarConfig: ""
    };
  },
  watch: {},
  mounted() {
    glob = this;

    window.onresize = this.adjustNavConfig;

    this.adjustNavConfig();
  },
  methods: {
    adjustNavConfig(e) {
      if (window.innerWidth > 568) {
        glob.navbarConfig = "top";
      } else {
        glob.navbarConfig = "bottom";
      }
    }
  }
};
</script>

<style lang="scss">
.entry {
  @include flex(column, flex-start, flex-start);
  &.reverse {
    flex-direction: column-reverse;
  }
  .navbar {
    background-color: #fafafa;
    height: 44px;
    width: 100%;
    &.top {
      border-bottom: 1px solid #eee;
    }
    &.bottom {
      border-top: 1px solid #eee;
    }
    nav {
      @include flex(row, space-around, center);
      padding: 0;
      .link {
        width: 100%;
        flex: 1;
        &.active {
          background-color: #eaeaea;
        }
        a {
          @include flex(column, center, center);
          padding: 4px 0;
          i {
            display: inline;
            font-size: 20px;
            line-height: 1;
            margin: 0;
          }
          span {
            font-size: 10px;
            color: $color-1;
          }
        }
      }
    }
  }
  .main-content {
    height: calc(100vh - 44px);
    overflow-y: auto;
    padding: 16px 0 0;
    width: 100%;
  }
}
</style>
