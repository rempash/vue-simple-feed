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
    postsHash: {},
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
    concatArrayProp(state, {prop, value}: {prop: string, value: Array<any>}): void{
      state[prop] = state[prop].concat(value);
    },
    changePostRating({ posts, postsHash }, { action, id }: {action: boolean, id: number}): void{
      action ? ++posts[postsHash[id]].rating : --posts[postsHash[id]].rating;
    },
    createPostsHash({ postsHash, posts }){
      posts.forEach((post, index) => postsHash[post.id] = index);
    }
  },
  actions: {
    getPosts({ commit, state }, { action }: { action: string } = { action: 'concatArrayProp'}): void {
      EventBus.$emit('toggleBlockUi', true);
      axios.get(`${state.apiUrl}/posts`, {
          params: {
            _embed: 'comments',
            ...state.step,
            ...state.query
          }
        })
           .then(({ data: posts }) => {
            commit({
              type: action,
              prop: 'posts',
              value: posts.map(post => ({
                ...post,
                rating: Math.floor(Math.random() * 10) + 1  
              }))
            });
            commit('createPostsHash');
           })
           .catch(err => new Error(err))
           .finally(() => EventBus.$emit('toggleBlockUi', false));
    },
    getPostById({ state }, { id }: { id: number }): Promise<PostInterface>{
      EventBus.$emit('toggleBlockUi', true);
      return axios.get(`${state.apiUrl}/posts/${id}`, {
        params: {
          _embed: 'comments',
        }
      })
           .then(({ data }) => data)
           .catch(err => new Error(err))
           .finally(() => EventBus.$emit('toggleBlockUi', false));
    }
  },
  getters: {
    getPostById: ({ posts, postsHash }) => (id) => posts[postsHash[id]],
    hasPosts: ({ posts }) => posts.length > 0,
  }
});
