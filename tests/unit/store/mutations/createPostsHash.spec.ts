import * as assert from 'assert';
import { expect } from 'chai';
import {mutations} from '@/store/mutations';
const { createPostsHash } = mutations;

describe('createPostsHash mutation', () => {

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

    it('should create a hash of posts', () => {
        createPostsHash(state);
        expect(state.postsHash).to.eql({ 1: 0, 2: 1 });
    });

});
