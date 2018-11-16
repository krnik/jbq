import { expect } from 'chai';
import { SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../../../src/constants';
import { TypeBoolean } from '../../../src/types/Boolean';
import { values } from '../../data/main';

export default () => describe(TYPE_NAME.BOOLEAN, () => {
    describe(TYPE, () => {
        const base = 'boolean';
        it('valid value', () => {
            const value = false;
            expect(TypeBoolean[TYPE](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = {};
            expect(TypeBoolean[TYPE](base, value)).to.be.a('string');
        });
        it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
            expect(TypeBoolean[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
        });
        it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
            for (const value of values.non.string)
                expect(() => TypeBoolean[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
        });
    });
    describe(VALUE, () => {
        const base = false;
        it('valid value', () => {
            const value = false;
            expect(TypeBoolean[VALUE](base, value)).to.be.equal(undefined);
        });
        it('invalid value', () => {
            const value = true;
            expect(TypeBoolean[VALUE](base, value)).to.be.a('string');
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
