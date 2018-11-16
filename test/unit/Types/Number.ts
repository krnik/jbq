import { expect } from 'chai';
import { MAX, MIN, MULTIPLE_OF, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, ONE_OF } from '../../../src/constants';
import { TypeNumber } from '../../../src/types/Number';
import { values } from '../../data/main';

export default () => describe(TYPE_NAME.NUMBER, () => {
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeNumber[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeNumber[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
        });
    });
    describe(MIN, () => {
        const base = 10;
        it('valid value', () => {
            const value = 100;
            expect(TypeNumber[MIN](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = 0;
            expect(TypeNumber[MIN](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeNumber[SYM_TYPE_VALIDATE][MIN](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeNumber[SYM_TYPE_VALIDATE][MIN](value)).to.throw();
        });
    });
    describe(MAX, () => {
        const base = 10;
        it('valid value', () => {
            const value = 0;
            expect(TypeNumber[MAX](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = 100;
            expect(TypeNumber[MAX](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeNumber[SYM_TYPE_VALIDATE][MAX](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeNumber[SYM_TYPE_VALIDATE][MAX](value)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeNumber[SYM_TYPE_VALIDATE][MULTIPLE_OF](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeNumber[SYM_TYPE_VALIDATE][MULTIPLE_OF](value)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeNumber[SYM_TYPE_VALIDATE][ONE_OF](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            const invalidValues = [
                [1, 2, NaN],
                [],
                {},
                [1, 2, '0'],
            ];
            for (const value of invalidValues)
                expect(() => TypeNumber[SYM_TYPE_VALIDATE][ONE_OF](value)).to.throw();
        });
    });
});
