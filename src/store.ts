import { CommentsInterface } from '@/interfaces/comments.interface';
import { PostInterface } from '@/interfaces/post.interface';
import { QueryInterface } from '@/interfaces/query.interface';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { StateInterface } from '@/interfaces/state.interface';
import { EventBus } from './event-bus';

Vue.use(Vuex);
export default new Vuex.Store<StateInterface>({
  state: {
    apiUrl: `https://jsonplaceholder.typicode.com`,
    posts: [],
    step: {
      _limit: 15,
      _start: 0,
    },
    query: {},
  },
  mutations: {
    setProp<T>(state, { prop, value }: {prop: string, value: T}): void{
      state[prop] = value;
    },
    makeStepLimit({ step }, ){
      step._limit += 10;
    },
    makeStepStart({ step }, { isFiltered }: {isFiltered: boolean }){
      step._start = isFiltered ? 0 : step._limit - 10;
    },
    concatArrayProp(state, {prop, value}): void{
      state[prop] = state[prop].concat(value);
    },
    changePostRating({ posts }, { action, index }: {action: boolean, index: number}): void{
      action ? ++posts[index].rating : --posts[index].rating;
    }
  },
  actions: {
    getPosts({ commit, state, getters }, { action }: { action: string } = { action: 'concatArrayProp'}): void {
      EventBus.$emit('toggleBlockUi', true);
      axios.get(`${state.apiUrl}/posts?_embed=comments&${getters.getQueryParams('step')}${getters.getQueryParams('query')}`)
           .then(({ data }) => commit({
            type: action,
            prop: 'posts',
            value: data.map(singlePost => ({
                ...singlePost,
                rating: 0,
              }))
            }))
           .catch(err => new Error(err))
           .finally(() => EventBus.$emit('toggleBlockUi', false));
    },
  },
  getters: {
    getQueryParams: (state) => (prop: string): string => Object.keys(state[prop]).reduce((paramStr: string, param: string) => paramStr += state[prop][param] ? `${param}=${state[prop][param]}&` : '', ''),
  },
});
