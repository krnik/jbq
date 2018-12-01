import { expect } from 'chai';
import { REQUIRED, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../../../src/constants';
import { TypeAny } from '../../../src/types/Any';
import { TypeArray } from '../../../src/types/Array';
import { TypeBoolean } from '../../../src/types/Boolean';
import { values } from '../../data/main';

export default () => describe(TYPE_NAME.ANY, () => {
    describe(TYPE, () => {
        const base = 'any';
        it('valid value', () => {
            expect(TypeAny[TYPE]()).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeArray[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeAny[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
        });
    });
    describe(REQUIRED, () => {
        const base = true;
        it('valid value', () => {
            const value = {};
            expect(TypeAny[REQUIRED](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = undefined;
            expect(TypeAny[REQUIRED](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeBoolean[SYM_TYPE_VALIDATE][VALUE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.boolean)
                expect(() => TypeBoolean[SYM_TYPE_VALIDATE][VALUE](value)).to.throw();
        });
    });
});
