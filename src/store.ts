import { CommentsInterface } from '@/interfaces/comments.interface';
import { PostInterface } from '@/interfaces/post.interface';
import { QueryInterface } from '@/interfaces/query.interface';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { StateInterface } from '@/interfaces/state.interface';

Vue.use(Vuex);
export default new Vuex.Store<StateInterface>({
  state: {
    apiUrl: `https://jsonplaceholder.typicode.com`,
    posts: [],
    step: {
      _limit: 15,
      _start: 0,
    },
    query: {

    },
  },
  mutations: {
    setQuery(state, newQuery: QueryInterface): void {
      state.query = newQuery;
    },
    setProp(state, { prop, value }): void{
      state[prop] = value;
    },
    concatArrayProp(state, {prop, value}): void{
      state[prop] = state[prop].concat(value);
    },
    changePostRating(state, { action, index }: {action: boolean, index: number}): void{
      action ? ++state.posts[index].rating : --state.posts[index].rating;
    }
  },
  actions: {
    getPosts({ commit, state, getters }): void {
      axios.get(`${state.apiUrl}/posts?${getters.getQueryParams('step')}_embed=comments`)
           .then(({ data }) => commit({
            type: 'concatArrayProp',
            prop: 'posts',
            value: data.map(singlePost => ({
                ...singlePost,
                rating: 0,
              }))
            }))
           .catch((err) => new Error(err));
    },
  },
  getters: {
    getQueryParams: (state) => (prop: string) => Object.keys(state[prop]).reduce((paramStr: string, param: string) => paramStr += `${param}=${state[prop][param]}&`, ''),
  },
});
