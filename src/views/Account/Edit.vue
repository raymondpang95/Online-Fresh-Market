<template>
  <div class="account-update">
    <div class="container fluid">
      <form @submit.prevent="submitForm">
        <div class="card w-lg50-md50-sm100-xs100">
          <div class="headline lineBottom">
            <h4 class="mainTitle">配置</h4>
          </div>

          <form @submit.prevent="submitForm" class="mt-3">
            <div class="input-wrapper required" v-if="false">
              <label for>账号</label>
              <input type="text" placeholder="username123" readonly />
            </div>
            <div class="input-wrapper required">
              <label for>密码</label>
              <input type="password" placeholder="***********" />
            </div>
            <div class="btn-wrapper d-flex justify-content-end">
              <button class="btn update sm">更新</button>
            </div>
          </form>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "account-update",
  components: {},
  data() {
    return {
      password: ""
    };
  },
  methods: {
    async submitForm(e) {
      var request = await this.$api.account.updateAccount({
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss">
</style>