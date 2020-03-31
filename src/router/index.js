import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* Start */

import Login from '../views/Login/Index'
import Entry from '../views/Index'

import Home from '../views/Home/Index'
import Account from '../views/Account/Edit';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      loginCheck: true
    }
  },
  {
    path: '/index',
    name: 'Entry',
    component: Entry,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
          requiresAuth: true
        }
      },
    ],
  }
]

/* End */

const router = new VueRouter({
  mode: 'history',
  routes
})

/* router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("userInfo") != null) {
      next();
      return;
    } else {
      next('/');
    }
  } else if (to.matched.some(record => record.meta.loginCheck)) {
    if (localStorage.getItem("userInfo") != null) {
      next("/home");
      return;
    } else {
      next();
    }
  } else {
    next();
  }
}); */

export default router
