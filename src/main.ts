import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import { filters } from '@/filters/filters';

filters.forEach(filter => Vue.filter(filter.title, filter.method));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
