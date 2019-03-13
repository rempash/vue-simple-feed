import * as assert from 'assert';
import { expect } from 'chai';
import {mutations} from '@/store/mutations';
const { makeStepStart } = mutations;

describe('makeStepStart mutation', () => {

    const state = {step: {_start: 10, _limit: 30}};

    it('should set _start property to 0', () => {
        makeStepStart(state, {isFiltered: true});
        expect(state).to.have.property('step')
                     .nested.property('_start', 0);
    });

    it('should set _start property to 20', () => {
        makeStepStart(state, {isFiltered: false});
        expect(state).to.have.property('step')
                     .nested.property('_start', 20);
    });

});
