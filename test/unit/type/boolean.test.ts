import { expect } from 'chai';
import { TYPE, TYPE_NAME, VALUE } from '../../../src/misc/constants';
import { TypeBoolean } from '../../../src/type/boolean';
import { check, property, gen } from 'testcheck';

describe(
    TYPE_NAME.BOOLEAN,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'boolean';
                it('valid value', (): void => {
                    check(
                        property(
                            gen.boolean,
                            (value): void => {
                                expect(TypeBoolean[TYPE](base, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });
                it('invalid value', (): void => {
                    const nonBool = gen.oneOf<unknown>([
                        gen.number,
                        gen.string,
                        gen.null,
                        gen.undefined,
                        gen.object({ x: gen.boolean }),
                        gen.array(gen.boolean),
                    ]);
                    check(
                        property(
                            nonBool,
                            (value): void => {
                                expect(TypeBoolean[TYPE](base, value)).to.be.a('string');
                            },
                        ),
                    );
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
