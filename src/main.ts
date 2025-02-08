import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia, PiniaVuePlugin } from "pinia";
import "@/assets/css/main.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(PiniaVuePlugin);
const pinia = createPinia(); /* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  pinia,
  render: (h) => h(App),
});
