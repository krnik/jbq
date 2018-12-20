import { expect } from 'chai';
import { CONSTRUCTOR_NAME, INSTANCE_OF, PROPERTIES, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeObject } from '../../../src/types/Object';

describe(TYPE_NAME.OBJECT, () => {
    describe(TYPE, () => {
        const base = 'object';
        it('valid value', () => {
            const value = {};
            expect(TypeObject[TYPE](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = true;
            expect(TypeObject[TYPE](base, value)).to.be.a('string');
        });
    });
    describe(INSTANCE_OF, () => {
        const base = Array;
        it('valid value', () => {
            const value = [1];
            expect(TypeObject[INSTANCE_OF](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeObject[INSTANCE_OF](base, value)).to.be.a('string');
        });
    });
    describe(CONSTRUCTOR_NAME, () => {
        const base = 'Array';
        it('valid value', () => {
            const value = [1];
            expect(TypeObject[CONSTRUCTOR_NAME](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeObject[CONSTRUCTOR_NAME](base, value)).to.be.a('string');
        });
    });
    describe(PROPERTIES, () => {
        const base = ['0', '1'];
        it('valid value', () => {
            const value = {
                0: 1,
                1: 'nice, second index!',
            };
            expect(TypeObject[PROPERTIES](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeObject[PROPERTIES](base, value)).to.be.a('string');
        });
    });
});
