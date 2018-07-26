import { QueryInterface } from '@/interfaces/query.interface';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { StateInterface } from '@/interfaces/state.interface';

Vue.use(Vuex);
export default new Vuex.Store<StateInterface>({
  state: {
    apiUrl: `https://jsonplaceholder.typicode.com`,
    news: [],
    query: {
      _limits: 15,
      _start: 0,
    },
  },
  mutations: {
    setQuery({ query }, newQuery: QueryInterface): void{
      query = newQuery;
    },
  },
  actions: {
    getNews({ commit, state, getters }): void{
       axios.get(`${state.apiUrl}/posts${getters.getParams}`)
            .then(({ data }) => console.log(data))
            .catch((err) => console.log(err));
    },
  },
  getters: {
    getParams: state => Object.keys(state.query).reduce((paramStr: string, param: string) => paramStr += `${param}=${state.query[param]}&`, '?'),
  },
});
