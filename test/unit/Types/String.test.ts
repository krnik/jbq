import { expect } from 'chai';
import { ONE_OF, REGEX, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeString } from '../../../src/types/String';

describe(TYPE_NAME.STRING, () => {
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
    });
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
    });
    describe(ONE_OF, () => {
        const base = ['Admin', 'Manager', 'User', 'Guest'];
        it('valid value', () => {
            expect(TypeString[ONE_OF](base, 'Admin')).to.be.equal(undefined);
        });
        it('invalid value', () => {
            expect(TypeString[ONE_OF](base, '')).to.be.a('string');
        });
    });
});
