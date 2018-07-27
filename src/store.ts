import { NewsInterface } from '@/interfaces/news.interface';
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
      _limit: 15,
      _start: 0,
    },
  },
  mutations: {
    setQuery(state, newQuery: QueryInterface): void{
      state.query = newQuery;
    },
  },
  actions: {
    getNews({ commit, state, getters }): void{
      let news: NewsInterface[];
       axios.get(`${state.apiUrl}/posts${getters.getQueryParams}`)
            .then(({data}) => {
              news = data;
              return axios.get(`${state.apiUrl}/comments${getters.getQueryParams}`);
            })
            .then(({data}) => {
                console.log(data, news);
            })
            .catch((err) => console.log(err));
    },
  },
  getters: {
    getQueryParams: state => Object.keys(state['query']).reduce((paramStr: string, param: string) => paramStr += `${param}=${state.query[param]}&`, '?'),
  },
});
