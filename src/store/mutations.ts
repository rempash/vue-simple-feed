export const mutations = {
    setProp<T>(state, { prop, value }: {prop: string, value: T}): void {
        state[prop] = value;
    },
    makeStepLimit({ step } ) {
        step._limit += 10;
    },
    makeStepStart({ step }, { isFiltered }: {isFiltered: boolean }) {
        step._start = isFiltered ? 0 : step._limit - 10;
    },
    concatArrayProp(state, {prop, value}: {prop: string, value: any[]}): void {
        state[prop] = state[prop].concat(value);
    },
    changePostRating({ posts, postsHash }, { action, id }: {action: boolean, id: number}): void {
        action ? ++posts[postsHash[id]].rating : --posts[postsHash[id]].rating;
    },
    createPostsHash({ postsHash, posts }) {
        posts.forEach((post, index) => postsHash[post.id] = index);
    },
};
