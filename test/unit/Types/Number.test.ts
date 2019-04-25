import { expect } from 'chai';
import { MULTIPLE_OF, ONE_OF, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeNumber } from '../../../src/types/number';

describe(TYPE_NAME.NUMBER, () => {
    describe(TYPE, () => {
        const base = 'number';
        it('valid value', () => {
            const value = 2;
            expect(TypeNumber[TYPE](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = NaN;
            expect(TypeNumber[TYPE](base, value)).to.be.a('string');
        });
    });
    describe(MULTIPLE_OF, () => {
        const base = 10;
        it('valid value', () => {
            const value = 20;
            expect(TypeNumber[MULTIPLE_OF](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = 12;
            expect(TypeNumber[MULTIPLE_OF](base, value)).to.be.a('string');
        });
    });
    describe(ONE_OF, () => {
        const base = [2, 4, 6, 8];
        it('valid value', () => {
            expect(TypeNumber[ONE_OF](base, 2)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            expect(TypeNumber[ONE_OF](base, 0)).to.be.a('string');
        });
    });
});
