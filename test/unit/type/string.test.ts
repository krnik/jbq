import { expect } from 'chai';
import { ONE_OF, REGEX, TYPE, TYPE_NAME } from '../../../src/misc/constants';
import { TypeString } from '../../../src/type/string';
import { check, property, gen } from 'testcheck';

describe(
    TYPE_NAME.STRING,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'string';
                it('valid value', (): void => {
                    check(
                        property(
                            gen.string,
                            (value): void => {
                                expect(TypeString[TYPE](base, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });
                it('invalid value', (): void => {
                    const nonString = gen.oneOf<unknown>([
                        gen.number,
                        gen.null,
                        gen.undefined,
                        gen.object,
                        gen.array,
                    ]);
                    check(
                        property(
                            nonString,
                            (value): void => {
                                expect(TypeString[TYPE](base, value)).to.be.a('string');
                            },
                        ),
                    );
                });
            },
        );
        describe(
            REGEX,
            (): void => {
                const base = /^Sho/i;
                it('valid value', (): void => {
                    const value = 'Short.';
                    expect(TypeString[REGEX](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = 'Long string with at least 10 characters.';
                    expect(TypeString[REGEX](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            ONE_OF,
            (): void => {
                const base = ['Admin', 'Manager', 'User', 'Guest'];
                it('valid value', (): void => {
                    expect(TypeString[ONE_OF](base, 'Admin')).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    expect(TypeString[ONE_OF](base, '')).to.be.a('string');
                });
            },
        );
    },
);
