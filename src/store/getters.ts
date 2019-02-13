export const getters = {
    getPostById: ({ posts, postsHash }) => (id) => posts[postsHash[id]],
    hasPosts: ({ posts }) => posts.length > 0,
};
