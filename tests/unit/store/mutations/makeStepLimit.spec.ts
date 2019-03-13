import * as assert from 'assert';
import { expect } from 'chai';
import {mutations} from '@/store/mutations';
const { makeStepLimit } = mutations;

describe('makeStepLimit mutation', () => {

    it('should increase _limit property by 10', () => {
        const state = {step: {_limit: 10}};
        makeStepLimit(state);
        expect(state).to.have.property('step')
                     .nested.property('_limit', 20);
    });

});
