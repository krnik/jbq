import { expect } from 'chai';
import 'mocha';
import { EVERY, INCLUDES, SOME, TYPE, TYPE_NAME } from '../../../src/misc/constants';
import { TypeArray } from '../../../src/type/array';

describe(
    TYPE_NAME.ARRAY,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'array';
                it('valid value', (): void => {
                    const data = [1, 2];
                    expect(TypeArray[TYPE](base, data)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = {};
                    expect(TypeArray[TYPE](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            INCLUDES,
            (): void => {
                const base = 10;
                it('valid value', (): void => {
                    const value = [10, 20, 30];
                    expect(TypeArray[INCLUDES](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = [0, 20, 30];
                    expect(TypeArray[INCLUDES](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            EVERY,
            (): void => {
                const base = (el: number): boolean => typeof el === 'number';
                it('valid value', (): void => {
                    const value = [10, 20, 30];
                    expect(TypeArray[EVERY](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = [10, 20, '30'];
                    expect(TypeArray[EVERY](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            SOME,
            (): void => {
                const base = (el: number): boolean => typeof el === 'number';
                it('valid value', (): void => {
                    const value = [10, 20, 30];
                    expect(TypeArray[SOME](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = ['10', '20', '30'];
                    expect(TypeArray[SOME](base, value)).to.be.a('string');
                });
            },
        );
    },
);
