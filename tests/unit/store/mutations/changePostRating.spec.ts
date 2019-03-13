import * as assert from 'assert';
import { expect } from 'chai';
import {mutations} from '@/store/mutations';
const { changePostRating } = mutations;

describe('changePostRating mutation', () => {

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

    it('should increment post rating', () => {
        changePostRating(state, { action: true, id: 1 });
        // assert.equal(state.posts[state.postsHash[1]].rating, 4);
        expect(state.posts[state.postsHash[1]].rating).equal(4);
    });

    it('should decrement post rating', () => {
        changePostRating(state, { action: false, id: 2 });
        // assert.equal(state.posts[state.postsHash[2]].rating, 5);
        expect(state.posts[state.postsHash[2]].rating).equal(5);
    });

});
