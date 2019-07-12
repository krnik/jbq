import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { EVERY, INCLUDES, SOME, TYPE, LEN, TYPE_ARRAY } from '../../../src/misc/constants';
import { TypeArray } from '../../../src/type/array';
import { isValidationError } from '../../utils';

describe(
    TYPE_ARRAY,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const schemaValue = TYPE_ARRAY;
                const { validator } = TypeArray.getKeyword(TYPE);

                it('valid value', (): void => {
                    check(
                        property(
                            gen.array(gen.number, { size: 5 }),
                            (value): void => {
                                expect(validator(schemaValue, value)).to.be.equal(undefined);
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
                                isValidationError(validator(schemaValue, value));
                            },
                        ),
                    );
                });
            },
        );

        describe(
            INCLUDES,
            (): void => {
                const schemaValue = 10;
                const { validator } = TypeArray.getKeyword(INCLUDES);

                it('valid value', (): void => {
                    const value = [10, 20, 30];
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = [0, 20, 30];
                    isValidationError(validator(schemaValue, value));
                });
            },
        );

        describe(
            EVERY,
            (): void => {
                const schemaValue = (el: number): boolean => typeof el === 'number';
                const { validator } = TypeArray.getKeyword(EVERY);

                it('valid value', (): void => {
                    const value = [10, 20, 30];
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = [10, 20, '30'];
                    isValidationError(validator(schemaValue, value));
                });
            },
        );

        describe(
            SOME,
            (): void => {
                const schemaValue = (el: number): boolean => typeof el === 'number';
                const { validator } = TypeArray.getKeyword(SOME);

                it('valid value', (): void => {
                    const value = [10, 20, 30];
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = ['10', '20', '30'];
                    isValidationError(validator(schemaValue, value));
                });
            },
        );

        // TODO: Test macro
        describe.skip(LEN, (): void => {});
    },
);
