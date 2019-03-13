import * as assert from 'assert';
import { expect } from 'chai';
import {getters} from '@/store/getters';
const { getPostById } = getters;

describe('getPostById getter', () => {

    const state = {
        posts: [
            {
                id: 1,
                rating: 3,
            },
            {
                id: 2,
                rating: 6,
            },
        ],
        postsHash: {},
    };

    state.posts.forEach((post, index) => state.postsHash[post.id] = index);

    it('should return post object by post id', () => {
        const postById = getPostById(state)(1);
        expect(postById).to.be.eql({ id: 1, rating: 3 });
    });

});
