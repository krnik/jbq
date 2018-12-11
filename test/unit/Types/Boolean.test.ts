import { expect } from 'chai';
import { TYPE, TYPE_NAME, VALUE } from '../../../src/constants';
import { TypeBoolean } from '../../../src/types/Boolean';

describe(TYPE_NAME.BOOLEAN, () => {
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
    });
});
