import { expect } from 'chai';
import { EVERY, INCLUDES, SOME, TYPE, TYPE_NAME } from '../../../src/misc/constants';
import { TypeArray } from '../../../src/type/array';
import { check, property, gen } from 'testcheck';

describe(
    TYPE_NAME.ARRAY,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'array';
                it('valid value', (): void => {
                    check(
                        property(
                            gen.array(gen.number, { size: 5 }),
                            (value): void => {
                                expect(TypeArray[TYPE](base, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });
                it('invalid value', (): void => {
                    const nonArray = gen.oneOf([gen.JSONPrimitive, gen.object({ x: gen.null })]);
                    check(
                        property(
                            nonArray,
                            (value): void => {
                                expect(TypeArray[TYPE](base, value)).to.be.a('string');
                            },
                        ),
                    );
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
