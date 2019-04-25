import { expect } from 'chai';
import 'mocha';
import { EVERY, INCLUDES, SOME, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeArray } from '../../../src/types/array';

describe(TYPE_NAME.ARRAY, () => {
    describe(TYPE, () => {
        const base = 'array';
        it('valid value', () => {
            const data = [1, 2];
            expect(TypeArray[TYPE](base, data)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeArray[TYPE](base, value)).to.be.a('string');
        });
    });
    describe(INCLUDES, () => {
        const base = 10;
        it('valid value', () => {
            const value = [10, 20, 30];
            expect(TypeArray[INCLUDES](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = [0, 20, 30];
            expect(TypeArray[INCLUDES](base, value)).to.be.a('string');
        });
    });
    describe(EVERY, () => {
        const base = (el: number) => typeof el === 'number';
        it('valid value', () => {
            const value = [10, 20, 30];
            expect(TypeArray[EVERY](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = [10, 20, '30'];
            expect(TypeArray[EVERY](base, value)).to.be.a('string');
        });
    });
    describe(SOME, () => {
        const base = (el: number) => typeof el === 'number';
        it('valid value', () => {
            const value = [10, 20, 30];
            expect(TypeArray[SOME](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = ['10', '20', '30'];
            expect(TypeArray[SOME](base, value)).to.be.a('string');
        });
    });
});
