import {EventBus} from '@/event-bus';
import axios from 'axios';
import {PostInterface} from '@/interfaces/post.interface';

export const actions = {
    getPosts({ commit, state }, { action }: { action: string } = { action: 'concatArrayProp'}): void {
        EventBus.$emit('toggleBlockUi', true);
        axios.get(`${state.apiUrl}/posts`, {
            params: {
                _embed: 'comments',
                ...state.step,
                ...state.query,
            },
        })
            .then(({ data: posts }) => {
                commit({
                    type: action,
                    prop: 'posts',
                    value: posts.map((post) => ({
                        ...post,
                        rating: Math.floor(Math.random() * 10) + 1,
                    })),
                });
                commit('createPostsHash');
            })
            .catch((err) => new Error(err))
            .finally(() => EventBus.$emit('toggleBlockUi', false));
    },
    getPostById({ state }, { id }: { id: number }): Promise<PostInterface> {
        EventBus.$emit('toggleBlockUi', true);
        return axios.get(`${state.apiUrl}/posts/${id}`, {
            params: {
                _embed: 'comments',
            },
        })
            .then(({ data }) => data)
            .catch((err) => new Error(err))
            .finally(() => EventBus.$emit('toggleBlockUi', false));
    },
};
