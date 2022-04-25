import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fontawesome from "./utils/fontawesome";
Vue.config.productionTip = false;

new Vue({
  fontawesome,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
