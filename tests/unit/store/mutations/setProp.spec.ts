import * as assert from 'assert';
import { expect } from 'chai';
import {mutations} from '@/store/mutations';
const { setProp } = mutations;

describe('setProp mutation', () => {

    it('should has property id with value 1 in state', () => {
        const state = {};
        setProp(state, { prop: 'id', value: 1 });
        expect(state).to.have.property('id', 1);
    });

});
