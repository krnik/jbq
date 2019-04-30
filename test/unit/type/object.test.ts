import { expect } from 'chai';
import {
    CONSTRUCTOR_NAME,
    INSTANCE_OF,
    PROPERTIES,
    TYPE,
    TYPE_NAME,
} from '../../../src/misc/constants';
import { TypeObject } from '../../../src/type/object';
import { check, property, gen } from 'testcheck';

describe(
    TYPE_NAME.OBJECT,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const base = 'object';
                it('valid value', (): void => {
                    check(
                        property(
                            gen.object({}),
                            (value): void => {
                                expect(TypeObject[TYPE](base, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });
                it('invalid value', (): void => {
                    const nonObject = gen.oneOf<unknown>([
                        gen.number,
                        gen.string,
                        gen.null,
                        gen.undefined,
                        gen.array(gen.int),
                    ]);
                    check(
                        property(
                            nonObject,
                            (value): void => {
                                expect(TypeObject[TYPE](base, value)).to.be.a('string');
                            },
                        ),
                    );
                });
            },
        );
        describe(
            INSTANCE_OF,
            (): void => {
                const base = Array;
                it('valid value', (): void => {
                    const value = [1];
                    expect(TypeObject[INSTANCE_OF](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = {};
                    expect(TypeObject[INSTANCE_OF](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            CONSTRUCTOR_NAME,
            (): void => {
                const base = 'Array';
                it('valid value', (): void => {
                    const value = [1];
                    expect(TypeObject[CONSTRUCTOR_NAME](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = {};
                    expect(TypeObject[CONSTRUCTOR_NAME](base, value)).to.be.a('string');
                });
            },
        );
        describe(
            PROPERTIES,
            (): void => {
                const base = ['0', '1'];
                it('valid value', (): void => {
                    const value = {
                        0: 1,
                        1: 'nice, second index!',
                    };
                    expect(TypeObject[PROPERTIES](base, value)).to.be.equal(undefined);
                });
                it('invalid value', (): void => {
                    const value = {};
                    expect(TypeObject[PROPERTIES](base, value)).to.be.a('string');
                });
            },
        );
    },
);
