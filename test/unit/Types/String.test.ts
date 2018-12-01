import { expect } from 'chai';
import { LEN, ONE_OF, REGEX, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeString } from '../../../src/types/String';
import { values } from '../../data/main';

export default () => describe(TYPE_NAME.STRING, () => {
    describe(TYPE, () => {
        const base = 'string';
        it('valid value', () => {
            const value = '[1, 2]';
            expect(TypeString[TYPE](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeString[TYPE](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeString[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeString[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
        });
    });
    // describe(MIN_LEN, () => {
    //     const base = 10;
    //     it('valid value', () => {
    //         const value = 'Long string with at least 10 characters.';
    //         expect(TypeString[MIN_LEN](base, value)).to.be.equal(undefined);
    //     });
    //     it('invalid value', () => {
    //         const value = 'Short.';
    //         expect(TypeString[MIN_LEN](base, value)).to.be.a('string');
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
    //         expect(TypeString[SYM_TYPE_VALIDATE][MIN_LEN](base)).to.be.equal(undefined);
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
    //         for (const value of values.non.number)
    //             expect(() => TypeString[SYM_TYPE_VALIDATE][MIN_LEN](value)).to.throw();
    //     });
    // });
    // describe(MAX_LEN, () => {
    //     const base = 10;
    //     it('valid value', () => {
    //         const value = 'Short.';
    //         expect(TypeString[MAX_LEN](base, value)).to.be.equal(undefined);
    //     });
    //     it('invalid value', () => {
    //         const value = 'Long string with at least 10 characters.';
    //         expect(TypeString[MAX_LEN](base, value)).to.be.a('string');
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
    //         expect(TypeString[SYM_TYPE_VALIDATE][MAX_LEN](base)).to.be.equal(undefined);
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
    //         for (const value of values.non.number)
    //             expect(() => TypeString[SYM_TYPE_VALIDATE][MAX_LEN](value)).to.throw();
    //     });
    // });
    describe(REGEX, () => {
        const base = /^Sho/i;
        it('valid value', () => {
            const value = 'Short.';
            expect(TypeString[REGEX](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = 'Long string with at least 10 characters.';
            expect(TypeString[REGEX](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeString[SYM_TYPE_VALIDATE][REGEX](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.regex)
                expect(() => TypeString[SYM_TYPE_VALIDATE][REGEX](value)).to.throw();
        });
    });
    describe(LEN, () => {
        const base = 10;
        it('valid value', () => {
            const value = 'Actually10';
            expect(TypeString[LEN](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = 'Long string with at least 10 characters.';
            expect(TypeString[LEN](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeString[SYM_TYPE_VALIDATE][LEN](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.number)
                expect(() => TypeString[SYM_TYPE_VALIDATE][LEN](value)).to.throw();
        });
    });
    describe(ONE_OF, () => {
        const base = ['Admin', 'Manager', 'User', 'Guest'];
        it('valid value', () => {
            expect(TypeString[ONE_OF](base, 'Admin')).to.be.equal(undefined);
        });
        it('invalid value', () => {
            expect(TypeString[ONE_OF](base, '')).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeString[SYM_TYPE_VALIDATE][ONE_OF](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            const invalidValues = [
                [],
                {},
                ['Admin', {}],
                ['true', false],
            ];
            for (const value of invalidValues)
                expect(() => TypeString[SYM_TYPE_VALIDATE][ONE_OF](value)).to.throw();
        });
    });
});
