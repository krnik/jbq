import { expect } from 'chai';
import { CONSTRUCTOR_NAME, INSTANCE_OF, MAX_KEY_COUNT, MAX_PROP_COUNT, MIN_KEY_COUNT, MIN_PROP_COUNT, PROPERTIES, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeObject } from '../../../src/types/Object';
import { values } from '../../data/main';

export default () => describe(TYPE_NAME.OBJECT, () => {
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.function)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](value)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](value)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][PROPERTIES](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            const nonKeyValues = values.non.string.filter((e) => {
                switch (typeof e) {
                    case 'string':
                    case 'number':
                    case 'symbol':
                        return true;
                    default:
                        return false;
                }
            });
            for (const value of nonKeyValues)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][PROPERTIES](value)).to.throw();
        });
    });
    describe(MIN_PROP_COUNT, () => {
        const base = 2;
        it('valid value', () => {
            const value = {
                prop: 1,
                key: 1,
            };
            expect(TypeObject[MIN_PROP_COUNT](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeObject[MIN_PROP_COUNT](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][MIN_PROP_COUNT](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][MIN_PROP_COUNT](value)).to.throw();
        });
    });
    describe(MAX_PROP_COUNT, () => {
        const base = 2;
        it('valid value', () => {
            expect(TypeObject[MAX_PROP_COUNT](base, {})).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = [1, 2, 3];
            expect(TypeObject[MAX_PROP_COUNT](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][MAX_PROP_COUNT](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][MAX_PROP_COUNT](value)).to.throw();
        });
    });
    describe(MIN_KEY_COUNT, () => {
        const base = 2;
        it('valid value', () => {
            const value = { a: 1, b: 2 };
            expect(TypeObject[MIN_KEY_COUNT](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = { a: 1 };
            expect(TypeObject[MIN_KEY_COUNT](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][MIN_KEY_COUNT](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][MIN_KEY_COUNT](value)).to.throw();
        });
    });
    describe(MAX_KEY_COUNT, () => {
        const base = 2;
        it('valid value', () => {
            const value = { a: 1 };
            expect(TypeObject[MAX_KEY_COUNT](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = { a: 1, b: 2, c: 3 };
            expect(TypeObject[MAX_KEY_COUNT](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeObject[SYM_TYPE_VALIDATE][MAX_KEY_COUNT](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeObject[SYM_TYPE_VALIDATE][MAX_KEY_COUNT](value)).to.throw();
        });
    });
});
