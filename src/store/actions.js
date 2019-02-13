import { EventBus } from "@/event-bus";
import axios from "axios";
export const actions = {
    getPosts({ commit, state }, { action } = { action: 'concatArrayProp' }) {
        EventBus.$emit('toggleBlockUi', true);
        axios.get(`${state.apiUrl}/posts`, {
            params: Object.assign({ _embed: 'comments' }, state.step, state.query)
        })
            .then(({ data: posts }) => {
            commit({
                type: action,
                prop: 'posts',
                value: posts.map(post => (Object.assign({}, post, { rating: Math.floor(Math.random() * 10) + 1 })))
            });
            commit('createPostsHash');
        })
            .catch(err => new Error(err))
            .finally(() => EventBus.$emit('toggleBlockUi', false));
    },
    getPostById({ state }, { id }) {
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
};
//# sourceMappingURL=actions.js.map