import { CommentsInterface } from '@/interfaces/comments.interface';
import { PostInterface } from '@/interfaces/post.interface';
import { QueryInterface } from '@/interfaces/query.interface';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { StateInterface } from '@/interfaces/state.interface';
import { EventBus } from '../event-bus';
import {mutations} from '@/store/mutations';
import {actions} from '@/store/actions';
import {getters} from '@/store/getters';

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
    mutations,
    actions,
    getters,
});
