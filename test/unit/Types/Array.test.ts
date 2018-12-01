import { expect } from 'chai';
import { EVERY, INCLUDES, SOME, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeArray } from '../../../src/types/Array';
import { values } from '../../data/main';

export default () => describe(TYPE_NAME.ARRAY, () => {
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeArray[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeArray[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
        });
    });
    // describe(LEN, () => {
    //     const base = 2;
    //     it('valid value', () => {
    //         const value = [1, 2];
    //         expect(TypeArray[LEN](base, value)).to.be.equal(undefined);
    //     });
    //     it('invalid value', () => {
    //         const value: any[] = [];
    //         expect(TypeArray[LEN](base, value)).to.be.a('string');
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
    //         expect(TypeArray[SYM_TYPE_VALIDATE][LEN](base)).to.be.equal(undefined);
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
    //         for (const value of values.non.number)
    //             expect(() => TypeArray[SYM_TYPE_VALIDATE][LEN](value)).to.throw();
    //     });
    // });
    // describe(MAX_LEN, () => {
    //     const base = 10;
    //     it('valid value', () => {
    //         const value = new Array(9);
    //         expect(TypeArray[MAX_LEN](base, value)).to.be.equal(undefined);
    //     });
    //     it('invalid value', () => {
    //         const value = new Array(11);
    //         expect(TypeArray[MAX_LEN](base, value)).to.be.a('string');
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
    //         expect(TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](base)).to.be.equal(undefined);
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
    //         for (const value of values.non.number)
    //             expect(() => TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](value)).to.throw();
    //     });
    // });
    // describe(MIN_LEN, () => {
    //     const base = 2;
    //     it('valid value', () => {
    //         const value = new Array(4);
    //         expect(TypeArray[MIN_LEN](base, value)).to.be.equal(undefined);
    //     });
    //     it('invalid value', () => {
    //         const value = new Array(1);
    //         expect(TypeArray[MIN_LEN](base, value)).to.be.a('string');
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
    //         expect(TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](base)).to.be.equal(undefined);
    //     });
    //     it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
    //         for (const value of values.non.number)
    //             expect(() => TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](value)).to.throw();
    //     });
    // });
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeArray[SYM_TYPE_VALIDATE][INCLUDES](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            expect(() => TypeArray[SYM_TYPE_VALIDATE][INCLUDES](undefined)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeArray[SYM_TYPE_VALIDATE][EVERY](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.function)
                expect(() => TypeArray[SYM_TYPE_VALIDATE][EVERY](value)).to.throw();
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
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeArray[SYM_TYPE_VALIDATE][SOME](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.function)
                expect(() => TypeArray[SYM_TYPE_VALIDATE][SOME](value)).to.throw();
        });
    });
});
