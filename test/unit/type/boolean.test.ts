import { expect } from 'chai';
import { TYPE, TYPE_NAME, VALUE } from '../../../src/misc/constants';
import { TypeBoolean } from '../../../src/type/boolean';

describe(
    TYPE_NAME.BOOLEAN,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'boolean';
                it('valid value', (): void => {
                    const value = false;
                    expect(TypeBoolean[TYPE](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = {};
                    expect(TypeBoolean[TYPE](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            VALUE,
            (): void => {
                const base = false;
                it('valid value', (): void => {
                    const value = false;
                    expect(TypeBoolean[VALUE](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = true;
                    expect(TypeBoolean[VALUE](base, value)).to.be.a('string');
                });
            },
        );
    },
);
