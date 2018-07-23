import chai from 'chai';
import unit from './unit/index';
chai.should();

describe('Test', () => {
    for (const test of unit) test();
});
