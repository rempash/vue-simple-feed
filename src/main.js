import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store/index';
import { filters } from '@/filters/filters';
import { shim } from 'promise.prototype.finally';
filters.forEach(filter => Vue.filter(filter.title, filter.method));
shim();
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map