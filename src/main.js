// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDzFWZDmj4qjUEBpo8hXbFBow5zWQy1tWU",
  authDomain: "group-project-week-3.firebaseapp.com",
  databaseURL: "https://group-project-week-3.firebaseio.com",
  projectId: "group-project-week-3"
});

Vue.config.productionTip = false
Vue.prototype.$database=firebase.database();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
