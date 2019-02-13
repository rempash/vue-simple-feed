export const mutations = {
    setProp(state, { prop, value }) {
        state[prop] = value;
    },
    makeStepLimit({ step }) {
        step._limit += 10;
    },
    makeStepStart({ step }, { isFiltered }) {
        step._start = isFiltered ? 0 : step._limit - 10;
    },
    concatArrayProp(state, { prop, value }) {
        state[prop] = state[prop].concat(value);
    },
    changePostRating({ posts, postsHash }, { action, id }) {
        console.log(id);
        action ? ++posts[postsHash[id]].rating : --posts[postsHash[id]].rating;
    },
    createPostsHash({ postsHash, posts }) {
        posts.forEach((post, index) => postsHash[post.id] = index);
    },
};
//# sourceMappingURL=mutations.js.map