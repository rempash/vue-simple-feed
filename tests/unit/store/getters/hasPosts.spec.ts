import * as assert from 'assert';
import { expect } from 'chai';
import {getters} from '@/store/getters';
const { hasPosts } = getters;

describe('hasPosts getter', () => {

    it('should return true because posts not empty', () => {
        expect(hasPosts({posts: [1, 2, 3]})).equal(true);
    });

    it('should return false because posts are empty', () => {
        expect(hasPosts({posts: []})).equal(false);
    });

});
