import Vue from 'vue'

import accountModel from "@/views/Account/model";
import loginModel from "@/views/Login/model";
import homeModel from "@/views/Home/model";

const models = {
  home: homeModel,
  login: loginModel,
  account: accountModel,
}

Vue.prototype.$api = models;