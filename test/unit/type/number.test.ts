import { expect } from 'chai';
import { MULTIPLE_OF, ONE_OF, TYPE, TYPE_NAME } from '../../../src/misc/constants';
import { TypeNumber } from '../../../src/type/number';
import { check, property, gen } from 'testcheck';

describe(
    TYPE_NAME.NUMBER,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'number';
                it('valid value', (): void => {
                    check(
                        property(
                            gen.number,
                            (value): void => {
                                expect(TypeNumber[TYPE](base, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });
                it('invalid value', (): void => {
                    const nonNumber = gen.oneOf<unknown>([
                        gen.NaN,
                        gen.string,
                        gen.null,
                        gen.undefined,
                        gen.boolean,
                        gen.array(gen.boolean),
                    ]);
                    check(
                        property(
                            nonNumber,
                            (value): void => {
                                expect(TypeNumber[TYPE](base, value)).to.be.a('string');
                            },
                        ),
                    );
                });
            },
        );
        describe(
            MULTIPLE_OF,
            (): void => {
                const base = 10;
                it('valid value', (): void => {
                    const value = 20;
                    expect(TypeNumber[MULTIPLE_OF](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = 12;
                    expect(TypeNumber[MULTIPLE_OF](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            ONE_OF,
            (): void => {
                const base = [2, 4, 6, 8];
                it('valid value', (): void => {
                    expect(TypeNumber[ONE_OF](base, 2)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    expect(TypeNumber[ONE_OF](base, 0)).to.be.a('string');
                });
            },
        );
    },
);
