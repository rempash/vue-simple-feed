import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";
import { getters } from "@/store/getters";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        apiUrl: `https://jsonplaceholder.typicode.com`,
        posts: [],
        postsHash: {},
        step: {
            _limit: 15,
            _start: 0,
        },
        query: {},
    },
    mutations,
    actions,
    getters,
});
//# sourceMappingURL=index.js.map