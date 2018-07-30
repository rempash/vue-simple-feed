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
    comments: {}
  },
  mutations: {
    setQuery(state, newQuery: QueryInterface): void {
      state.query = newQuery;
    },
    setProp(state, { prop, value }){
      state[prop] = value;
    }
  },
  actions: {
    getComments({ commit, state }){
      axios.get(`${state.apiUrl}/comments`)
           .then(({ data }) => {
             let comments: {[index: number]: any} = {};
             data.forEach(comment => {
               comments[comment.postId] ? comments[comment.postId].push(comment) : comments[comment.postId] = [comment];
             })
             commit({
               type: 'setProp',
               prop: 'comments',
               value: comments
             })
           });
    },
    getNews({ commit, state, getters }): void {
      axios.get(`${state.apiUrl}/posts${getters.getQueryParams}`)
            .then(({data}) => {
              console.log(data);
            })
            .catch((err) => console.log(err));
    },
  },
  getters: {
    getQueryParams: (state) => Object.keys(state.query).reduce((paramStr: string, param: string) => paramStr += `${param}=${state.query[param]}&`, '?'),
  },
});
