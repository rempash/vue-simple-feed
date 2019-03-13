import * as assert from 'assert';
import { expect } from 'chai';
import {mutations} from '@/store/mutations';
const { concatArrayProp } = mutations;

describe('concatArrayProp mutation', () => {

    it('should concat array property to argument array', () => {
        const state = {array: [1, 2, 3]};
        concatArrayProp(state, { prop: 'array', value: [4, 5, 6] } );
        expect(state.array).eql([1, 2, 3, 4, 5, 6]);
    });

});
